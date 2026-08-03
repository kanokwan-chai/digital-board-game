const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const fontPath = 'C:\\Windows\\Fonts\\THSarabunNew.ttf';
const fontBoldPath = 'C:\\Windows\\Fonts\\THSarabunNew Bold.ttf';

const doc = new PDFDocument({
  size: 'A4',
  margin: 40
});

const outputPath = path.join(__dirname, '..', 'Logic_Quest_Rulebook_PWC1.pdf');
doc.pipe(fs.createWriteStream(outputPath));

doc.registerFont('THSarabun', fontPath);
doc.registerFont('THSarabun-Bold', fontBoldPath);

// Title Banner Box
doc.rect(40, 40, 515, 80).fillAndStroke('#4a3509', '#8c6d23');

doc.font('THSarabun-Bold').fontSize(22).fillColor('#fbbf24')
   .text('📜 กฎกติกาและคู่มือการใช้งาน - Logic Quest: คดีลับเมืองอาร์เคน', 55, 52);

doc.font('THSarabun-Bold').fontSize(14).fillColor('#fef08a')
   .text('วิชาตรรกศาสตร์เบื้องต้น | ระดับชั้น ปวช.1 | สำนักสืบสวนเวทมนตร์', 55, 80);

doc.font('THSarabun-Bold').fontSize(13).fillColor('#ffffff')
   .text('🌐 เว็บไซต์ออนไลน์: https://digital-board-game-pwc.vercel.app', 55, 98);

doc.moveDown(2);
doc.y = 135;

function drawSectionHeader(title) {
  doc.rect(40, doc.y, 515, 24).fill('#78350f');
  doc.font('THSarabun-Bold').fontSize(14).fillColor('#ffffff')
     .text(title, 48, doc.y + 3);
  doc.y += 28;
}

// 1. Objectives
drawSectionHeader('🎯 1. วัตถุประสงค์ของเกม (Game Objectives)');
doc.font('THSarabun').fontSize(14).fillColor('#2d2415')
   .text('นักเรียนจะรับบทเป็น นักสืบเวทมนตร์ประจำสำนักสืบสวนลับ เพื่อร่วมกันคลี่คลายคดีโจรกรรมธนาคารมนตราแห่งเมืองอาร์เคน โดยใช้ทักษะ การคิดเชิงคำนวณ (Computational Thinking) และ ตรรกศาสตร์เบื้องต้น ในการวิเคราะห์หลักฐาน คัดแยกประพจน์ และต่อวงจรตรรกศาสตร์เพื่อปลดล็อกเบาะแสและกู้คืนศิลานักปราชญ์', { width: 515 });

doc.moveDown(1);

// 2. Characters
drawSectionHeader('⚔️ 2. นักสืบประจำหน่วย (4 ตัวละครพิเศษ)');

const characters = [
  { name: '🦉 อาร์กัส (นักสืบอาร์เคน)', desc: 'ใช้ Hint ใบ้คำตอบฟรี 1 ครั้งแรกของด่านโดยไม่เสียคะแนน' },
  { name: '🔥 ไซเฟอร์ (สายลับเงา)', desc: 'เริ่มต้นเกมด้วยพลังเวทสะสม 120 คะแนน (ปกติ 100)' },
  { name: '🛡️ เล็กซ์ (อัครนายอำเภอ)', desc: 'เมื่อร่ายคาถาผิดพลาด เสียคะแนนเพียง -3 แต้ม (ปกติ -5)' },
  { name: '🧪 นาโอมิ (นิติเวชเวทย์)', desc: 'เมื่อต่อวงจรสำเร็จ รับคะแนนพิเศษ +12 แต้ม (ปกติ +10)' }
];

characters.forEach(c => {
  doc.font('THSarabun-Bold').fontSize(13).fillColor('#854d0e').text(`• ${c.name}: `, { continued: true });
  doc.font('THSarabun').fontSize(13).fillColor('#2d2415').text(c.desc);
});

doc.moveDown(1);

// 3. Levels Table
drawSectionHeader('🗺️ 3. โครงสร้างด่านทั้งหมด (5 ด่านเรียนรู้)');

const tableTop = doc.y;
const colX = [40, 90, 230, 360, 555];

// Header
doc.rect(40, tableTop, 515, 20).fill('#b45309');
doc.font('THSarabun-Bold').fontSize(12).fillColor('#ffffff');
doc.text('ด่าน', colX[0] + 5, tableTop + 3);
doc.text('สถานที่ / ภารกิจ', colX[1] + 5, tableTop + 3);
doc.text('รูปแบบการเล่น', colX[2] + 5, tableTop + 3);
doc.text('หัวข้อตรรกศาสตร์', colX[3] + 5, tableTop + 3);

const levels = [
  ['ด่าน 1', 'ห้องโถงวิเคราะห์หลักฐาน', 'คัดแยกการ์ด (Sorting)', 'จำแนก 10 ข้อความว่าเป็น ประพจน์จริง (T), เท็จ (F) หรือ ไม่ใช่ประพจน์ (?)'],
  ['ด่าน 2', 'ห้องแล็บปรุงยาพิษเวทมนตร์', 'ต่อวงจร (Builder Palette)', 'ใช้ตัวเชื่อมพื้นฐาน: และ (AND), หรือ (OR), ไม่ (NOT)'],
  ['ด่าน 3', 'ที่เกิดเหตุตรอกรัตติกาล', 'ต่อวงจร (Builder Palette)', 'ใช้ตัวเชื่อมเหตุผล: ถ้า...แล้ว (IF_THEN), ก็ต่อเมื่อ (IFF)'],
  ['ด่าน 4', 'สำนักงานใหญ่กองสืบสวน', 'ต่อวงจร (Builder Palette)', 'สมการประสม 3 เงื่อนไขขึ้นไป + การ์ดปฏิเสธ ไม่'],
  ['ด่าน 5', 'ห้องนิรภัยธนาคารเวทมนตร์', 'ต่อวงจร (Builder Palette)', 'สมการซับซ้อน + ใส่วงเล็บ ( ) กำหนดลำดับการคำนวณ']
];

let curY = tableTop + 20;
levels.forEach((row, i) => {
  const bg = i % 2 === 0 ? '#fffbeb' : '#fef3c7';
  doc.rect(40, curY, 515, 22).fill(bg);
  doc.font('THSarabun-Bold').fontSize(12).fillColor('#78350f').text(row[0], colX[0] + 5, curY + 3);
  doc.font('THSarabun').fontSize(12).fillColor('#2d2415');
  doc.text(row[1], colX[1] + 5, curY + 3, { width: colX[2] - colX[1] - 5 });
  doc.text(row[2], colX[2] + 5, curY + 3, { width: colX[3] - colX[2] - 5 });
  doc.text(row[3], colX[3] + 5, curY + 3, { width: colX[4] - colX[3] - 10 });
  curY += 22;
});

doc.y = curY + 15;

// 4. Game Mechanics
drawSectionHeader('🎮 4. ระบบการเล่นและเงื่อนไขจบเกม (Game Mechanics)');

const mechanics = [
  'การ์ดอาร์ตเวิร์กคมชัด: การ์ดประพจน์และการ์ดตัวเชื่อมใช้รูปภาพการ์ดตามธีมแฟนตาซีเดิม',
  'โจทย์ภารกิจคลีน: แสดงข้อความคำสั่งภารกิจและเป้าหมายชัดเจน ไม่บังพื้นที่กระดาน',
  '💥 พลังเวทมนตร์หมดสิ้น (Game Over): เมื่อคะแนนลดลงเหลือ 0 🔮 ระบบจะเด้งหน้าต่าง Game Over เพื่อให้กดเติมพลังเวท 100 แต้มและเริ่มสอบใหม่',
  '👨‍🏫 ทำเนียบครู (Teacher Dashboard): ปุ่ม 🗑️ ล้างประวัติคลาส ลบประวัตินักเรียนและคะแนนผลการเล่นทั้ง Supabase และ LocalStorage เกลี้ยง 100%'
];

mechanics.forEach(m => {
  doc.font('THSarabun').fontSize(13).fillColor('#2d2415').text(`• ${m}`);
});

doc.moveDown(1);

// 5. Scoring System
drawSectionHeader('📊 5. สรุปเกณฑ์คะแนน (Scoring System)');

doc.font('THSarabun').fontSize(13).fillColor('#2d2415')
   .text('• ตอบถูก / ต่อวงจรสำเร็จ: +10 แต้ม (ตัวละครนาโอมิ ได้ +12 แต้ม)')
   .text('• ตอบผิด / คาถาล้มเหลว: -5 แต้ม (ตัวละครเล็กซ์ เสียแค่ -3 แต้ม)')
   .text('• ขอคำใบ้ (Hint): -5 แต้ม (อาร์กัส ใช้ฟรี 1 ครั้งแรกของด่าน)')
   .text('• การ์ดเผยความจริง (Reveal): -15 แต้ม')
   .text('• พลังเวทมนตร์หมดสิ้น (0 แต้ม): เด้งหน้าต่าง Game Over เพื่อเติมพลังเวทสอบใหม่');

doc.moveDown(1.5);
doc.font('THSarabun-Bold').fontSize(12).fillColor('#b45309')
   .text('Digital Board Game - Logic Quest v2.0 | วิชาตรรกศาสตร์เบื้องต้น ปวช.1 | สำนักสืบสวนเวทมนตร์เมืองอาร์เคน', { align: 'center' });

doc.end();
console.log("✅ Successfully generated PDF file at:", outputPath);
