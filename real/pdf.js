import { jsPDF } from "jspdf";
function saveAsPdf() {
  const container = document.getElementById("editor");
  const content = container.innerHTML; // div의 HTML 내용을 가져옴

  // Blob을 생성하여 파일로 변환
  const blob = new Blob([content], { type: "text/html" });
  const doc = new jsPDF("p", "mm", "a4");
  doc.Blob = blob;
  doc.save("cover.pdf");
}
