/**
 * 🔮 LOGIC QUEST : คลังโจทย์และข้อมูลด่านการ์ดตรรกศาสตร์ (ธีมสืบสวนคดีลับเมืองเวทมนตร์)
 */

export const levelsData = [
  {
    id: 1,
    title: "ด่าน 1: ห้องเก็บแฟ้มคดีปริศนา (Mystery Files Archive)",
    description: "ตรวจสอบแฟ้มรายงานเบาะแสและหลักฐาน 10 ประโยค เพื่อจำแนกว่าอักขระใดเป็นประพจน์จริง, ประพจน์เท็จ หรือคำอุทานถามสืบสวนที่ไม่ใช่ประพจน์",
    theme: "bg-gradient-to-br from-amber-50/80 to-yellow-100/60 border-amber-200",
    nodeColor: "bg-amber-400 shadow-amber-200",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    icon: "Fingerprint",
    gameType: "sorting",
    missions: [
      {
        id: "l1_m1",
        statement: "พบรอยนิ้วมือเวทมนตร์บนขวดน้ำยาพิษ",
        correctCategory: "true_prop",
        explanation: "เป็นประพจน์จริง เนื่องจากเจ้าหน้าที่ชันสูตรระบุว่าตรวจพบรอยนิ้วมือสะท้อนแสงบนขวดแก้วจริง",
        hint: "มีร่องรอยของรอยสัมผัสค้างไว้บนขวดของกลางเกิดเหตุจริงหรือไม่",
        image: "/images/statements/1.png"
      },
      {
        id: "l1_m2",
        statement: "ไม่พบรอยนิ้วมือใดๆ บนขวดน้ำยาพิษ",
        correctCategory: "false_prop",
        explanation: "เป็นประพจน์เท็จ เนื่องจากรายงานการตรวจนิติเคมีระบุว่าพบรอยนิ้วมือเวทมนตร์ประทับอยู่อย่างหนาแน่น",
        hint: "ย้อนดูรายงานนิติเคมีว่าพบรอยนิ้วมือเวทมนตร์บนขวดแก้วหรือไม่",
        image: "/images/statements/7.png"
      },
      {
        id: "l1_m3",
        statement: "ใครเป็นคนขโมยคัมภีร์เวทอาร์เคนไป?",
        correctCategory: "non_prop",
        explanation: "ไม่ใช่ประพจน์ เนื่องจากเป็นประโยคคำถามซึ่งต้องการคำอธิบาย ไม่สามารถประเมินจริงหรือเท็จได้ทันที",
        hint: "ประโยคสืบสวนที่เป็นคำถาม ไม่จัดเป็นประพจน์",
        image: "/images/statements/13.png"
      },
      {
        id: "l1_m4",
        statement: "คริสตัลบันทึกภาพคนร้ายชุดดำได้",
        correctCategory: "true_prop",
        explanation: "เป็นประพจน์จริง เพราะหน่วยวิเคราะห์ยืนยันว่ากล้องวงจรปิดบันทึกรอยขัดแย้งของพลังงานสำเร็จ",
        hint: "ลองเช็กภาพบันทึกพยานหลักฐานว่าส่องภาพของคนร้ายค้างไว้ได้หรือไม่",
        image: "/images/statements/3.png"
      },
      {
        id: "l1_m5",
        statement: "คาถาสะกดรอยจะทิ้งคราบเลือดสีทอง",
        correctCategory: "false_prop",
        explanation: "เป็นประพจน์เท็จ เนื่องจากคาถาสะกดรอยจะทิ้งเพียงละอองสีฟ้าเรืองแสง ไม่ใช่คราบเลือดใดๆ",
        hint: "ละอองพลังงานสะกดรอยจะแสดงผลออกมาเป็นคราบเลือดจริงหรือ",
        image: "/images/statements/8.png"
      },
      {
        id: "l1_m6",
        statement: "ว้าว! รอยแผลเวทนี้สยดสยองมาก!",
        correctCategory: "non_prop",
        explanation: "ไม่ใช่ประพจน์ เนื่องจากเป็นประโยคอุทานบอกอารมณ์ความรู้สึกส่วนตัว หาค่าความจริงไม่ได้",
        hint: "ประโยคที่แสดงความตระหนกตกใจ ไม่เป็นประพจน์",
        image: "/images/statements/15.png"
      },
      {
        id: "l1_m7",
        statement: "หน่วยปราบปรามใช้ตราเป็นเหรียญทอง",
        correctCategory: "true_prop",
        explanation: "เป็นประพจน์จริง ตามกฎหมายการสถาปนากองกำลังเจ้าหน้าที่รักษากฎหมายประจำเมือง",
        hint: "ตราสัญลักษณ์เกียรติยศมีลักษณะเป็นเหรียญโลหะสีทองใช่หรือไม่",
        image: "/images/statements/5.png"
      },
      {
        id: "l1_m8",
        statement: "ห้ามทำลายหลักฐานคาถาสะกดรอย!",
        correctCategory: "non_prop",
        explanation: "ไม่ใช่ประพจน์ เนื่องจากเป็นประโยคคำสั่งห้ามทำลายพยานวัตถุในคดี",
        hint: "ข้อสั่งห้ามเด็ดขาดของเจ้าหน้าที่ตำรวจเวท ไม่นับเป็นประพจน์",
        image: "/images/statements/16.png"
      },
      {
        id: "l1_m9",
        statement: "เหยื่อเสียชีวิตตอนเที่ยงคืนตรง",
        correctCategory: "true_prop",
        explanation: "เป็นประพจน์จริง เนื่องจากสามารถประเมินวันเวลาเกิดเหตุออกมาเป็นจริงหรือเท็จได้",
        hint: "ประโยคบอกเวลาการเสียชีวิตเพื่อสรุปสำนวนคดี ถือเป็นประพจน์",
        image: "/images/statements/4.png"
      },
      {
        id: "l1_m10",
        statement: "คนร้ายหนีไปโดยไม่ใช้ไม้กวาดบิน",
        correctCategory: "false_prop",
        explanation: "เป็นประพจน์เท็จ เพราะพยานยืนยันว่าคนร้ายใช้ไม้กวาดบินความเร็วสูงเร่งด่วนในการหลบหนี",
        hint: "ทวนเบาะแสอีกครั้งสิว่ากลไกการหลบหนีนั้นต้องอาศัยอุปกรณ์ไม้กวาดบินหรือไม่",
        image: "/images/statements/11.png"
      }
    ]
  },
  {
    id: 2,
    title: "ด่าน 2: ห้องแล็บชันสูตรสารพิษ (Forensic Alchemy Lab)",
    description: "วิเคราะห์ส่วนผสมของยาพิษและสารละลายในที่เกิดเหตุ ด้วยการเชื่อมประพจน์: และ (∧), หรือ (∨), ไม่ (นิเสธ)",
    theme: "bg-gradient-to-br from-purple-50/80 to-purple-100/60 border-purple-200",
    nodeColor: "bg-purple-400 shadow-purple-200",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "Cpu",
    gameType: "builder",
    missions: [
      {
        id: "l2_m1",
        question: "🧪 ภารกิจ: ต่อการ์ดเรื่อง 'รอยนิ้วมือบนขวด' กับเรื่อง 'ยาพิษผสมน้ำยากล่อมประสาท' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/potion_cup.jpg",
        hint: "เลือกการ์ดที่จริงทั้งสองใบ แล้วใช้ตัวเชื่อมที่ต้องการให้จริงทั้งคู่ (และ)",
        cards: [
          { id: "P", type: "Statement", content: "พบรอยนิ้วมือเวทมนตร์บนขวดน้ำยาพิษ", value: true, image: "/images/situations/potion_cup.jpg" },
          { id: "Q", type: "Statement", content: "สารพิษที่พบคือยาพิษผสมน้ำยากล่อมประสาท", value: true, image: "/images/situations/potion_cup.jpg" },
          { id: "R", type: "Statement", content: "คริสตัลบันทึกภาพคนร้ายชุดดำได้", value: true, image: "/images/situations/tracking_spell.png" }, 
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" },
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" } 
        ],
        expectedPattern: ["P", "AND", "Q"],
        evaluate: (exprValues) => exprValues.P && exprValues.Q
      },
      {
        id: "l2_m2",
        question: "🚨 ภารกิจ: ต่อการ์ดเรื่อง 'กริ่งเตือนภัย' กับเรื่อง 'ภาพคนร้ายชุดดำ' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/siren_signal.png",
        hint: "ใบหนึ่งเป็นเท็จ อีกใบเป็นจริง ต้องใช้ตัวเชื่อมอะไรถึงจะได้คำตอบเป็นจริง? (หรือ)",
        cards: [
          { id: "P", type: "Statement", content: "กริ่งแจ้งเตือนภัยดังขึ้นเฉพาะวันพระจันทร์เต็มดวง", value: false, image: "/images/situations/siren_signal.png" },
          { id: "Q", type: "Statement", content: "คริสตัลบันทึกภาพคนร้ายชุดดำได้", value: true, image: "/images/situations/tracking_spell.png" },
          { id: "R", type: "Statement", content: "พบรอยนิ้วมือเวทมนตร์บนขวดน้ำยาพิษ", value: true, image: "/images/situations/potion_cup.jpg" }, 
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" },
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" },
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" } 
        ],
        expectedPattern: ["P", "OR", "Q"],
        evaluate: (exprValues) => exprValues.P || exprValues.Q
      },
      {
        id: "l2_m3",
        question: "🔮 ภารกิจ: ใช้การ์ดตัวเชื่อมเปลี่ยนเรื่อง 'มีละอองเวทเรืองแสง' ให้กลายเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/tracking_spell.png",
        hint: "การ์ดปัจจุบันเป็นเท็จ ต้องใช้ตัวเชื่อมอะไรมาวางข้างหน้าเพื่อเปลี่ยนเท็จให้เป็นจริง? (ไม่)",
        cards: [
          { id: "P", type: "Statement", content: "มีละอองเวทเรืองแสง", value: false, image: "/images/situations/tracking_spell.png" },
          { id: "Q", type: "Statement", content: "สารพิษที่พบคือยาพิษผสมน้ำยากล่อมประสาท", value: true, image: "/images/situations/potion_cup.jpg" }, 
          { id: "R", type: "Statement", content: "กริ่งแจ้งเตือนภัยดังขึ้นเฉพาะวันพระจันทร์เต็มดวง", value: false, image: "/images/situations/siren_signal.png" }, 
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" },
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" },
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" }
        ],
        expectedPattern: ["NOT", "P"],
        evaluate: (exprValues) => !exprValues.P
      }
    ]
  },
  {
    id: 3,
    title: "ด่าน 3: ที่เกิดเหตุตรอกรัตติกาล (Nocturnal Alley Crime Scene)",
    description: "ชันสูตรพยานหลักฐานและวิเคราะห์คำให้การของผู้ต้องสงสัย ปลดล็อกเบาะแสด้วยเงื่อนไข: ถ้า...แล้ว, ก็ต่อเมื่อ",
    theme: "bg-gradient-to-br from-indigo-50/80 to-blue-100/60 border-indigo-200",
    nodeColor: "bg-indigo-400 shadow-indigo-200",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: "Key",
    gameType: "builder",
    missions: [
      {
        id: "l3_m1",
        question: "📜 ภารกิจ: ต่อการ์ดเรื่อง 'พบดีเอ็นเอพยาน' นำไปสู่เรื่อง 'นำตัวมาสอบปากคำ' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/alley_scene.jpg",
        hint: "ใช้ตัวเชื่อมที่บอกว่า 'ถ้าเกิดเหตุแรกขึ้น...แล้วจะส่งผลให้เกิดเหตุหลังตามมา' (ถ้า...แล้ว)",
        cards: [
          { id: "P", type: "Statement", content: "ตรวจพบดีเอ็นเอของพยาน", value: true, image: "/images/situations/alley_scene.jpg" },
          { id: "Q", type: "Statement", content: "นำตัวเข้าควบคุมเพื่อสอบปากคำ", value: true, image: "/images/situations/alley_scene.jpg" },
          { id: "R", type: "Statement", content: "กล่องเก็บของกลางเปิดออก", value: true, image: "/images/situations/mystery_chest.jpg" }, 
          { id: "IF_THEN", type: "Operator", content: "ถ้า...แล้ว", operator: "IF_THEN" },
          { id: "IF_THEN", type: "Operator", content: "ถ้า...แล้ว", operator: "IF_THEN" },
          { id: "IFF", type: "Operator", content: "ก็ต่อเมื่อ", operator: "IFF" },
          { id: "AND", type: "Operator", content: "และ", operator: "AND" } 
        ],
        expectedPattern: ["P", "IF_THEN", "Q"],
        evaluate: (exprValues) => !exprValues.P || exprValues.Q
      },
      {
        id: "l3_m2",
        question: "🔐 ภารกิจ: ต่อการ์ดเรื่อง 'กล่องของกลางเปิด' กับเรื่อง 'หมุนกุญแจทอง' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/mystery_chest.jpg",
        hint: "ใช้ตัวเชื่อมที่บอกว่าสองเรื่องนี้เกิดขึ้นพร้อมกันและมีค่าเท่ากัน (ก็ต่อเมื่อ)",
        cards: [
          { id: "P", type: "Statement", content: "กล่องเก็บของกลางเปิดออก", value: true, image: "/images/situations/mystery_chest.jpg" },
          { id: "Q", type: "Statement", content: "หมุนกุญแจทองครบรอบ", value: true, image: "/images/situations/mystery_chest.jpg" },
          { id: "R", type: "Statement", content: "ตรวจพบดีเอ็นเอของพยาน", value: true, image: "/images/situations/alley_scene.jpg" }, 
          { id: "IF_THEN", type: "Operator", content: "ถ้า...แล้ว", operator: "IF_THEN" },
          { id: "IFF", type: "Operator", content: "ก็ต่อเมื่อ", operator: "IFF" },
          { id: "IFF", type: "Operator", content: "ก็ต่อเมื่อ", operator: "IFF" },
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" } 
        ],
        expectedPattern: ["P", "IFF", "Q"],
        evaluate: (exprValues) => exprValues.P === exprValues.Q
      }
    ]
  },
  {
    id: 4,
    title: "ด่าน 4: สำนักงานใหญ่กองสืบสวนเวทมนตร์ (Auror Headquarters)",
    description: "เจาะเข้าระบบจัดเก็บเอกสารต้องห้ามคดีลับของส่วนกลาง ปลดล็อกสมการประสม 3 ตัวแปรขึ้นไป",
    theme: "bg-gradient-to-br from-pink-50/80 to-rose-100/60 border-rose-200",
    nodeColor: "bg-rose-400 shadow-rose-200",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    icon: "ShieldAlert",
    gameType: "builder",
    missions: [
      {
        id: "l4_m1",
        question: "🛡️ ภารกิจ: ต่อการ์ดเรื่อง 'ตราประจำหน่วย' + 'หนังสืออนุมัติ' + 'ไม่มีประวัติผิดกฎหมาย' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/headquarters.jpg",
        hint: "ใช้ตัวเชื่อม 'และ' เชื่อมทั้ง 3 เรื่องเข้าด้วยกัน โดยใส่การ์ด 'ไม่' หน้าเรื่องที่มีประวัติผิดกฎหมาย",
        cards: [
          { id: "P", type: "Statement", content: "เจ้าหน้าที่มีตราประจำหน่วย", value: true, image: "/images/situations/headquarters.jpg" },
          { id: "Q", type: "Statement", content: "ได้รับอนุมัติเป็นลายลักษณ์อักษร", value: true, image: "/images/situations/headquarters.jpg" },
          { id: "R", type: "Statement", content: "มีประวัติละเมิดกฎหมายเวทมนตร์", value: false, image: "/images/situations/headquarters.jpg" },
          { id: "S", type: "Statement", content: "เปิดเผยรหัสต่อสื่อภายนอก", value: true, image: "/images/situations/headquarters.jpg" }, 
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "AND", type: "Operator", content: "และ", operator: "AND" }, 
          { id: "AND", type: "Operator", content: "และ", operator: "AND" }, 
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" },
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" }, 
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" }, 
          { id: "IFF", type: "Operator", content: "ก็ต่อเมื่อ", operator: "IFF" } 
        ],
        expectedPattern: ["P", "AND", "Q", "AND", "NOT", "R"],
        evaluate: (exprValues) => exprValues.P && exprValues.Q && !exprValues.R
      }
    ]
  },
  {
    id: 5,
    title: "ด่าน 5: ห้องนิรภัยใต้ดินธนาคารเวทมนตร์ (Spellbound Bank Vault)",
    description: "คลายมนตราสะกดรหัสตรรกศาสตร์ 3 ชั้นของคนร้าย เพื่อกู้คืนศิลานักปราชญ์กลับมาเป็นหลักฐานกลางของคดี",
    theme: "bg-gradient-to-br from-purple-100/80 to-fuchsia-100/60 border-fuchsia-200",
    nodeColor: "bg-fuchsia-500 shadow-fuchsia-200",
    badgeColor: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
    icon: "Lock",
    gameType: "builder",
    missions: [
      {
        id: "l5_m1",
        question: "🔒 ภารกิจ: ใส่ (วงเล็บ) ครอบเรื่อง 'กรอกรหัส หรือ คลายโซ่สะกด' แล้วต่อด้วย 'ไม่สั่นสะเทือน' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/bank_vault.jpg",
        hint: "วางวงเล็บ ( ) ล้อมคู่แรกไว้ก่อน แล้วตามด้วยตัวเชื่อม 'และ' และการ์ด 'ไม่'",
        cards: [
          { id: "P", type: "Statement", content: "กรอกรหัสสะเดาะเวท", value: true, image: "/images/situations/bank_vault.jpg" },
          { id: "Q", type: "Statement", content: "คลายโซ่สะกดหลักฐาน", value: false, image: "/images/situations/bank_vault.jpg" },
          { id: "R", type: "Statement", content: "ตู้นิรภัยสั่นสะเทือนรุนแรง", value: false, image: "/images/situations/bank_vault.jpg" },
          { id: "S", type: "Statement", content: "มีคนร้ายแอบเข้ามา", value: true, image: "/images/situations/bank_vault.jpg" }, 
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "AND", type: "Operator", content: "และ", operator: "AND" }, 
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" }, 
          { id: "OR", type: "Operator", content: "หรือ", operator: "OR" }, 
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" },
          { id: "NOT", type: "Operator", content: "ไม่", operator: "NOT" },
          { id: "OPEN_BRACKET", type: "Operator", content: "(", operator: "(" },
          { id: "CLOSE_BRACKET", type: "Operator", content: ")", operator: ")" }
        ],
        expectedPattern: ["OPEN_BRACKET", "P", "OR", "Q", "CLOSE_BRACKET", "AND", "NOT", "R"],
        evaluate: (exprValues) => (exprValues.P || exprValues.Q) && !exprValues.R
      },
      {
        id: "l5_m2",
        question: "💥 ภารกิจ: ใส่ (วงเล็บ) ครอบเรื่อง 'ใช้คัมภีร์ และ สวดอักขระ' แล้วต่อด้วยเรื่อง 'วงเวทย์พังทลาย' ให้ได้คำตอบเป็น จริง",
        targetDescription: "จริง (True)",
        missionImage: "/images/situations/destruct_override.jpg",
        hint: "ใส่วงเล็บ ( ) ครอบเรื่องคู่แรก แล้วใช้ตัวเชื่อม 'ถ้า...แล้ว' ต่อไปยังเรื่องหลังสุด",
        cards: [
          { id: "P", type: "Statement", content: "ใช้คัมภีร์ปิดผนึก", value: true, image: "/images/situations/destruct_override.jpg" },
          { id: "Q", type: "Statement", content: "สวดอักขระอาร์เคน", value: true, image: "/images/situations/destruct_override.jpg" },
          { id: "R", type: "Statement", content: "วงเวทย์ข้ามมิติพังทลาย", value: true, image: "/images/situations/destruct_override.jpg" },
          { id: "S", type: "Statement", content: "คริสตัลขักข้อง", value: false, image: "/images/situations/destruct_override.jpg" }, 
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "AND", type: "Operator", content: "และ", operator: "AND" },
          { id: "IF_THEN", type: "Operator", content: "ถ้า...แล้ว", operator: "IF_THEN" },
          { id: "IF_THEN", type: "Operator", content: "ถ้า...แล้ว", operator: "IF_THEN" },
          { id: "OPEN_BRACKET", type: "Operator", content: "(", operator: "(" },
          { id: "CLOSE_BRACKET", type: "Operator", content: ")", operator: ")" }
        ],
        expectedPattern: ["OPEN_BRACKET", "P", "AND", "Q", "CLOSE_BRACKET", "IF_THEN", "R"],
        evaluate: (exprValues) => !(exprValues.P && exprValues.Q) || exprValues.R
      }
    ]
  }
];

export const commonMistakes = [
  {
    question: "ยาพิษในถ้วยแก้วประกอบขึ้นอย่างสมบูรณ์เมื่อ ใส่ผงมูนสโตน และ ใส่น้ำสกัดรากแมนเดรก",
    type: "สับสนตัวเชื่อม AND (และ) กับ OR (หรือ) ทำให้น้ำยาผสมผิดเพี้ยนไม่ได้สัดส่วน",
    count: 24
  },
  {
    question: "คาถาลบรอยเท้าสะกดรอยจะทุเลาเบาบางลงเมื่อ ไม่มีละอองเวทเรืองแสงเหลืออยู่",
    type: "ลืมใส่การ์ดปฏิเสธ [ไม่ (NOT)] นำหน้าข้อความประพจน์เดี่ยว ทำให้ตรรกะคาถาย้อนแย้งกัน",
    count: 18
  },
  {
    question: "ถ้าตรวจพบดีเอ็นเอของพยานในถ้วยชา แล้วต้องนำตัวเข้าควบคุมเพื่อสอบปากคำ",
    type: "วางลำดับเหตุผลสลับฝั่งกัน (Converse Fallacy) ระหว่างเหตุและผลของการสืบสวน",
    count: 15
  },
  {
    question: "ถอนสลักกลอนเมื่อ ( กรอกรหัสสะเดาะเวท หรือ คลายโซ่สะกด ) และ ไม่ ตู้นิรภัยสั่นสะเทือน",
    type: "ลืมใส่การ์ดวงเล็บเปิด/ปิดครบล้อมรอบกลุ่มตัวเชื่อมร่วม ทำให้ลำดับการลำดับตรรกะชนกัน",
    count: 12
  }
];
