웹(HTML) 에디터 만들기



### 시나리오

1. Editor를 통해 편집하여 문서 Format 생성
2. 서버 데이터를 불러와 매핑할 텍스트 선택
    - 토글 버튼을 활성화 하고, 텍스트를 선택 시 텍스트가 속한 HTML 태그 전체가 지정된다. </br>
    후에 부여된 id에 따라 서버의 데이터들이 매핑되어 대체된다.
3. 사용자는 해당 파일을 서버에 저장 가능
    - 서버에 저장 시 매핑될 태그들이 지정된 상태로 저장됨.
4. 사용자는 해당 파일을 다운로드 가능
    - 다운로드 시 매핑될 태그들이 실제 데이터들로 변환된 상태로 다운로드 된다.

### 요구사항
- CKEditor를 사용하여 기본 Editor 기능 구현. </br>
- 매핑할 텍스트 선택
- 매핑된 데이터 불러와서 대체
- 다운로드
- 서버에 문서 양식으로서 파일 저장
- PDF 변환 다운로드 및 저장
