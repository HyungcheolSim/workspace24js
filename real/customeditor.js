//저장하는 파일 명 입력받기. 없으면 cover
function saveAsHtml() {
    const container = document.getElementById("editor");
    const content = container.innerHTML; // div의 HTML 내용을 가져옴

    // Blob을 생성하여 파일로 변환
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // 다운로드 링크 생성 및 자동 클릭
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover.html"; // 다운로드할 파일 이름 지정
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // URL 객체 해제
    URL.revokeObjectURL(url);
  }

  function saveAsPdf() {
    const container = document.getElementById("editor");
    const content = container.innerHTML; // div의 HTML 내용을 가져옴

    // Blob을 생성하여 파일로 변환
    const blob = new Blob([content], { type: "text/html" });
    const doc = new jsPDF("p", "mm", "a4");
    const url = URL.createObjectURL(blob);
    doc.URL = url;
    doc.save("cover.pdf");
  }

