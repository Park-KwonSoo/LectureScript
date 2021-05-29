from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Recording
from .serializers import RecordingSerializer
from google.cloud import speech, storage

import datetime


#post : recording model을 만든다.
#get : 현재 로그인한 유저의 recording List를 가져온다.
class RecordingView(APIView) :
    def get(self, request) :
        data = Recording.objects.filter(email = request.user.get_username())

        serializer = RecordingSerializer(data, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request) :
        #요청 데이터를 가지고 typeScript로 변환
        Data = request.data
        Data['email'] = request.user.get_username()
        now = datetime.datetime.now()

        (get_url, fileName) = uploadToGcs(file = request.FILES.get('file'), 
            now = now, email = Data['email'], 
            title = Data['title'])

        Data['createdTime'] = now
        #타입 스크립트로 변환
        Data['typeScript'] = makeTypeScript(get_url)

        serializer = RecordingSerializer(data = Data)

        #모델 생성후
        if(serializer.is_valid()) :
            serializer.save()

        #파일을 gcs로부터 삭제
        removeFile(fileName)
        
        return Response(serializer.data, status = status.HTTP_200_OK)


#특정 ID값의 View를 가져옴
class GetRecordView(APIView) :
    def get(self, request, record_id) :
        email = request.user.get_username()

        data = Recording.objects.get(pk = record_id)

        if not data :
            return Response(None, status = status.HTTP_404_NOT_FOUND)
        
        if not data.isAuthorizedUser(email) :
            return Response(None, status = status.HTTP_403_FORBIDDEN)

        serializer = RecordingSerializer(data)

        return Response(serializer.data, status = status.HTTP_200_OK)
        



#file을 bucket에 업로드
def uploadToGcs(file, now, email, title) :
    timeStamp = now.strftime("%Y%m%d")

    bucketName = 'record-lecturescript'
    fileName = timeStamp + '_' + email + '_' + title

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucketName)
    blob = bucket.blob(fileName)

    blob.upload_from_file(file)

    return ('gs://' + bucketName + '/' + fileName, fileName)


#gcs의 uri를 typeScript로 변환해서 리턴
def makeTypeScript(uri) :
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri = uri)
    config = speech.RecognitionConfig(
        encoding = speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz = 48000,
        language_code = 'ko-KR',
        # alternative_language_code = 'en-US'
    )

    operation = client.long_running_recognize(config = config, audio = audio)
    
    response = operation.result(timeout = 90)

    typeScript = []
    for result in response.results :
        typeScript.append(result.alternatives[0].transcript)

    result = ''.join(typeScript)

    return result


#작업이 완료된 파일을 삭제
def removeFile(fileName) :
    storage_client = storage.Client()

    bucket = storage_client.bucket('record-lecturescript')
    blob = bucket.blob(fileName)

    blob.delete()

# Create your views here.
