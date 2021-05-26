from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from fpdf import FPDF
from google.cloud import storage
import os

FILE_PATH = '/Users/parkkwonsoo/Desktop/Project/LectureScript/server/lectureScript/pdf/data/'


class PdfView(APIView) :
    def post(self, request) :
        email = request.user.get_username()
        #파일을 만들고
        fileName = makePdf(request.data, email)
        #gcs에 업로드함
        path = deleteFileAndUpload(FILE_PATH, fileName)

        #성공적을 업로드 시, gcs의 경로와 fileName을 반환함
        return Response({
            'path' : path,
            'fileName' : fileName
        }, status = status.HTTP_201_CREATED)



#pdf를 만드는 클래스
class PDF(FPDF) :
    def footer(self) :
        self.set_y(-15)
        self.set_font('Arial', '', 8)
        self.set_text_color(128)
        self.cell(0, 0, 'Page' + str(self.page_no()), 0, 0, 'C')

    def write_cover(self, title, professor, createdData) :
        self.add_page()
        self.add_font('HANBatang', '', r'/Users/parkkwonsoo/Desktop/Project/LectureScript/server/lectureScript/pdf/font/HANBatang-LVT.ttf', uni = True)
       
        self.set_font('HANBatang', '', 30)
        self.cell(80)
        self.cell(30, 50, title, 0, 0, 'C')
        self.ln(50)

        self.set_font('HANBatang', '', 20)
        self.cell(80)
        self.cell(30, 0, createdData, 0, 0, 'C')
        self.ln(20)

        self.cell(80)
        self.cell(30, 0, professor, 0, 0, 'C')
        self.ln(20)

    def write_body(self, body) :
        self.add_page()
        self.set_font('HANBatang', '', 20)
        self.cell(5, 20)
        self.multi_cell(0, 10, body)


def makePdf(data, email) :
    title = data['title']
    createdDate = data['createdDate']
    professor = data['professor']
    body = data['typeScript']

    path = FILE_PATH
    fileName = email + '_' + title + '_' + createdDate + '.pdf'

    pdf = PDF()
    pdf.write_cover(title, professor, createdDate)
    pdf.write_body(body)
    pdf.output(path + fileName, 'F')

    return fileName

def deleteFileAndUpload(path, fileName) :
    bucketName = 'record-lecturescript'
    #gcs에 file upload
    storage_client = storage.Client()

    bucket = storage_client.bucket(bucketName)
    blob = bucket.blob(fileName)

    blob.upload_from_filename(path + fileName)
    # blob.make_public()

    #upload되면 서버에서 파일 삭제
    os.remove(path + fileName)

    #다운로드 주소
    return 'gs://' + bucketName + '/' + fileName
    
        


# Create your views here.
