import React, { useState, useRef, useEffect } from 'react';

const apiKey = "AIzaSyAD_EXu68DfJadGU4XXsyeuV0nwFmqeCio";

const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

async function geminiJSON(prompt) {
  const res = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });
  const data = await res.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text)
    throw new Error(data.error?.message || 'No response from Gemini');
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

const vocabData = [
  { cat: "Tài chính", word: "Substantial", ipa: "/səbˈstæn.ʃəl/", vi: "Đáng kể", ex: "A substantial increase in P&L.", hint: "Gợi ý: Thường đi kèm với 'increase' hoặc 'decrease', chỉ sự thay đổi về lượng rất lớn." },
  { cat: "Tài chính", word: "Deficit", ipa: "/ˈdef.ɪ.sɪt/", vi: "Thâm hụt", ex: "The trade deficit reached a record high.", hint: "Gợi ý: Trái ngược với thặng dư (Surplus), tình trạng khi chi tiêu vượt quá mức thu nhập." },
  { cat: "Vận hành", word: "Discrepancy", ipa: "/dɪˈskrep.ən.si/", vi: "Sự sai lệch", ex: "A discrepancy in the financial report.", hint: "Gợi ý: Bắt đầu bằng chữ 'D', dùng khi 2 bản báo cáo/dữ liệu không khớp nhau." },
  { cat: "Hợp đồng", word: "Stipulate", ipa: "/ˈstɪp.jə.leɪt/", vi: "Quy định", ex: "The contract stipulates the deadline.", hint: "Gợi ý: Động từ chuyên dùng trong hợp đồng, mang nghĩa 'nêu rõ điều kiện'." },
  { cat: "Đàm phán", word: "Intermediary", ipa: "/ˌɪn.təˈmiː.di.ə.ri/", vi: "Trung gian", ex: "The company acts as an intermediary.", hint: "Gợi ý: Người/bên thứ 3 đứng giữa để kết nối 2 bên." },
  { cat: "Pháp lý", word: "Compliance", ipa: "/kəmˈplaɪ.əns/", vi: "Sự tuân thủ", ex: "Ensure legal compliance for fintech.", hint: "Gợi ý: Làm đúng theo luật, quy chế (Compliance team)." },
  { cat: "Tài chính", word: "EBITDA", ipa: "/ˈiː.bɪt.dɑː/", vi: "Lợi nhuận gộp", ex: "Analyze the EBITDA margin.", hint: "Gợi ý: Một chỉ số tài chính quen thuộc, viết tắt của Earning Before Interest, Taxes..." },
  { cat: "Vận hành", word: "Overhead", ipa: "/ˈəʊ.və.hed/", vi: "Chi phí cố định", ex: "Reduce overhead costs.", hint: "Gợi ý: Chi phí vận hành không sinh lời trực tiếp (điện, nước, mặt bằng...)." },
  { cat: "Đàm phán", word: "Acquisition", ipa: "/ˌæk.wɪˈzɪʃ.ən/", vi: "Sự thâu tóm", ex: "An aggressive acquisition strategy.", hint: "Gợi ý: Chữ 'A' trong thuật ngữ M&A (Mua bán và sáp nhập)." },
  { cat: "Thị trường", word: "Fluctuate", ipa: "/ˈflʌk.tʃu.eɪt/", vi: "Dao động", ex: "Transaction volumes fluctuate daily.", hint: "Gợi ý: Động từ chỉ sự biến động, lên xuống thất thường như biểu đồ hình sin." },
  { cat: "Kỹ thuật", word: "Congestion", ipa: "/kənˈdʒes.tʃən/", vi: "Sự tắc nghẽn", ex: "Network congestion caused the delay.", hint: "Gợi ý: Thường dùng cho kẹt xe (Traffic), trong IT dùng cho nghẽn mạng." },
  { cat: "Tài chính", word: "Reconciliation", ipa: "/ˌrek.ənˌsɪl.iˈeɪ.ʃən/", vi: "Sự đối soát", ex: "Automated reconciliation saves time.", hint: "Gợi ý: Quá trình kế toán dò lại 2 sổ sách xem dòng tiền có khớp nhau không." }
];

const runningPlaylistBase = [
  { id: 1, en: "Digital payments are replacing cash transactions in many countries around the world.", vi: "Thanh toán kỹ thuật số đang thay thế giao dịch tiền mặt ở nhiều quốc gia trên thế giới." },
  { id: 2, en: "A substantial increase in revenue indicates that our new payment gateway strategy is working.", vi: "Doanh thu tăng đáng kể cho thấy chiến lược cổng thanh toán mới của chúng ta đang có hiệu quả." },
  { id: 3, en: "Blockchain technology provides a secure and transparent way to record financial transactions.", vi: "Công nghệ blockchain cung cấp cách ghi lại giao dịch tài chính an toàn và minh bạch." },
  { id: 4, en: "The compliance team must ensure that all fintech operations adhere to local regulations.", vi: "Đội ngũ tuân thủ phải đảm bảo rằng tất cả hoạt động fintech tuân thủ các quy định địa phương." },
  { id: 5, en: "There is a discrepancy between the settlement report and the actual transaction data.", vi: "Có sự sai lệch giữa báo cáo quyết toán và dữ liệu giao dịch thực tế." },
  { id: 6, en: "Venture capital firms invest in early-stage companies with high growth potential.", vi: "Các công ty đầu tư mạo hiểm đầu tư vào các công ty giai đoạn đầu có tiềm năng tăng trưởng cao." },
  { id: 7, en: "Mobile banking allows customers to manage their accounts and transfer funds from anywhere.", vi: "Ngân hàng di động cho phép khách hàng quản lý tài khoản và chuyển tiền từ bất cứ đâu." },
  { id: 8, en: "Overhead costs have fluctuated substantially during this quarter, affecting our EBITDA margin.", vi: "Chi phí cố định đã dao động đáng kể trong quý này, ảnh hưởng đến biên lợi nhuận EBITDA của chúng ta." },
  { id: 9, en: "The contract stipulates a penalty clause if the service level agreement is breached.", vi: "Hợp đồng quy định điều khoản phạt nếu thỏa thuận mức dịch vụ bị vi phạm." },
  { id: 10, en: "Interest rates set by central banks influence borrowing costs for businesses and consumers.", vi: "Lãi suất do ngân hàng trung ương đặt ra ảnh hưởng đến chi phí vay vốn cho doanh nghiệp và người tiêu dùng." },
  { id: 11, en: "Due diligence is the process of thoroughly investigating a business before making an acquisition.", vi: "Thẩm định là quá trình điều tra kỹ lưỡng một doanh nghiệp trước khi tiến hành thâu tóm." },
  { id: 12, en: "A trade deficit occurs when a country imports more goods and services than it exports.", vi: "Thâm hụt thương mại xảy ra khi một quốc gia nhập khẩu nhiều hàng hóa và dịch vụ hơn xuất khẩu." },
  { id: 13, en: "Inflation erodes the purchasing power of money over time, affecting savings and investments.", vi: "Lạm phát làm xói mòn sức mua của tiền theo thời gian, ảnh hưởng đến tiết kiệm và đầu tư." },
  { id: 14, en: "The company acts as an intermediary between merchants and payment processors.", vi: "Công ty hoạt động như một trung gian giữa các nhà bán hàng và bộ xử lý thanh toán." },
  { id: 15, en: "Automated reconciliation saves time and reduces human error in financial reporting.", vi: "Đối soát tự động tiết kiệm thời gian và giảm sai sót của con người trong báo cáo tài chính." },
  { id: 16, en: "Network congestion during peak hours can delay transaction processing and hurt user experience.", vi: "Nghẽn mạng trong giờ cao điểm có thể làm chậm xử lý giao dịch và ảnh hưởng trải nghiệm người dùng." },
  { id: 17, en: "E-commerce platforms have made it easier for small businesses to reach global customers.", vi: "Các nền tảng thương mại điện tử đã giúp các doanh nghiệp nhỏ tiếp cận khách hàng toàn cầu dễ dàng hơn." },
  { id: 18, en: "Liquidity refers to how quickly and easily an asset can be converted into cash.", vi: "Tính thanh khoản đề cập đến mức độ nhanh chóng và dễ dàng mà một tài sản có thể được chuyển đổi thành tiền mặt." },
  { id: 19, en: "Artificial intelligence is being used in fintech to detect fraud and automate customer service.", vi: "Trí tuệ nhân tạo đang được sử dụng trong fintech để phát hiện gian lận và tự động hóa dịch vụ khách hàng." },
  { id: 20, en: "A strong business strategy requires understanding both the competitive landscape and regulatory environment.", vi: "Một chiến lược kinh doanh mạnh cần hiểu cả bối cảnh cạnh tranh lẫn môi trường pháp lý." },
];

const initialWritingData = [
  {
    title: "Merchant Discontent: Interchange Fee",
    context: "Đối tác chuỗi rạp chiếu phim phàn nàn phí giao dịch qua cổng của bên mình quá cao (3.5%). P&L nội bộ lại báo cáo 'discrepancy' ở dòng tiền đối soát.",
    task: "Viết email từ chối giảm phí, dùng hệ thống đối soát tự động làm vũ khí giữ chân.",
    visualType: "invoice"
  },
  {
    title: "Revenue Deficit Notification",
    context: "Báo cáo Q3 ghi nhận khoản 'Substantial Deficit' (Thâm hụt) do 'Overhead costs' của team Vận hành vượt ngân sách 30%.",
    task: "Viết đoạn tóm tắt đề xuất cắt giảm chi phí (downsize) hoặc tối ưu quy trình (automation).",
    visualType: "chartDown"
  }
];

const initialSpeakingData = [
  {
    title: "SLA Renegotiation",
    context: "Đối tác e-commerce bị sập gateway hôm qua do lỗi bên mình. Bạn đang họp online với họ.",
    role: "Khách hàng đang rất tức giận. Bạn cần xoa dịu bằng lời nói và cam kết SLA uptime mới (99.99%).",
    visualType: "videoCall"
  },
  {
    title: "Pitching New Payment Gateway",
    context: "Trình bày với CFO về việc chuyển sang dùng cổng thanh toán mới rẻ hơn nhưng tích hợp khó hơn.",
    role: "CFO sẽ hỏi khó về ROI và rủi ro downtime lúc chuyển đổi. Chuẩn bị bảo vệ ý tưởng.",
    visualType: "presentation"
  }
];

const readingData = [
  {
    title: "Memo: Spike in Chargeback Rates",
    content: "Team, we've observed a substantial spike in chargeback requests over the last 72 hours, primarily originating from the newly onboarded gaming merchants. The discrepancy between approved transactions and settled amounts suggests a potential flaw in our anti-fraud intermediary layer. Please initiate a comprehensive reconciliation process immediately.",
    question: "What is the main cause suspected for the chargeback spike?",
    options: [
      "A flaw in the reconciliation protocol.",
      "A potential flaw in the anti-fraud intermediary layer.",
      "High overhead costs from gaming merchants.",
      "Network congestion."
    ],
    answerIdx: 1,
    explanation: "Dạ anh ơi, câu trả lời đúng là B nhé. Nếu anh để ý trong đoạn văn có câu: 'The discrepancy... suggests a potential flaw in our anti-fraud intermediary layer'. Câu này em tạm dịch là 'Sự sai lệch số liệu... cho thấy một lỗ hổng tiềm ẩn trong lớp trung gian chống gian lận'. Nó chỉ thẳng nguyên nhân gây ra chargeback (hoàn tiền) luôn đó anh.",
    sampleSentence: "Our compliance team flagged a discrepancy in the anti-fraud intermediary layer, triggering an immediate reconciliation audit.",
    visualType: "dashboardAlert"
  }
];

const IconZap = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconVocab = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>;
const IconListen = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;
const IconSpeak = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const IconRead = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const IconWrite = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const IconRandom = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const IconPlay = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconCheck = () => <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const IconX = () => <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const IconSparkles = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const IconLoading = () => <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const IconLightbulb = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const IconMicOutline = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const IconPlus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;
const IconClose = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

const VisualInvoice = () => (
  <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col font-mono text-xs text-gray-600 relative overflow-hidden shrink-0 min-h-[150px]">
    <div className="flex justify-between border-b border-dashed border-gray-300 pb-2 mb-2">
      <span className="font-bold">INVOICE #892</span>
      <span>05/18/2026</span>
    </div>
    <div className="flex justify-between py-1"><span>Gateway Setup</span><span>$500.00</span></div>
    <div className="flex justify-between py-1"><span>Monthly Maint.</span><span>$100.00</span></div>
    <div className="flex justify-between py-1 bg-red-50 text-red-700 font-bold px-1 rounded mt-1 border border-red-100">
      <span>Interchange Fee (3.5%)</span><span>$12,450.00</span>
    </div>
    <div className="mt-auto pt-2 border-t border-gray-300 flex justify-between font-bold text-gray-900 text-sm">
      <span>TOTAL DUE</span><span>$13,050.00</span>
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] border-4 border-red-500 text-red-500 text-xl font-black p-1 opacity-20 uppercase tracking-widest">Disputed</div>
  </div>
);

const VisualChartDown = () => (
  <div className="w-full h-full bg-gray-900 rounded-xl shadow-inner p-4 flex flex-col relative overflow-hidden shrink-0 min-h-[150px]">
    <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">Q3 Revenue vs Overhead</h4>
    <div className="flex-1 w-full flex items-end gap-2 pb-6">
      <div className="w-1/4 bg-blue-500/20 rounded-t h-[80%] relative"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t h-[60%]"></div></div>
      <div className="w-1/4 bg-blue-500/20 rounded-t h-[70%] relative"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t h-[50%]"></div></div>
      <div className="w-1/4 bg-red-500/20 rounded-t h-[90%] relative"><div className="absolute bottom-0 w-full bg-red-500 rounded-t h-[100%] shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div></div>
    </div>
    <svg className="absolute inset-0 w-full h-full z-10 drop-shadow-md" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M 0,40 L 33,50 L 66,20 L 100,80" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="100" cy="80" r="4" fill="#ef4444" />
    </svg>
    <div className="absolute bottom-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">-30% Deficit</div>
  </div>
);

const VisualVideoCall = () => (
  <div className="w-full h-full bg-gray-900 rounded-xl shadow-lg flex flex-col overflow-hidden relative shrink-0 min-h-[180px]">
    <div className="absolute top-3 left-3 bg-red-600 animate-pulse w-2 h-2 rounded-full"></div>
    <div className="absolute top-2 left-7 text-gray-300 text-[10px]">REC 14:02</div>
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-20 h-20 bg-red-900/50 rounded-full border-2 border-red-500 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">😡</div>
    </div>
    <div className="h-10 bg-gray-800 flex justify-center items-center gap-4 px-4 shrink-0">
      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white"><IconX /></div>
      <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-[10px]">📷</div>
      <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-[10px]">🎤</div>
    </div>
    <div className="absolute bottom-12 left-4 bg-black/60 px-2 py-1 rounded text-white text-[10px] backdrop-blur-sm">VP of E-commerce</div>
  </div>
);

const VisualPresentation = () => (
  <div className="w-full h-full bg-slate-100 rounded-xl border-4 border-gray-800 shadow-md p-4 flex flex-col justify-center items-center relative shrink-0 min-h-[180px]">
    <h3 className="text-blue-800 font-black text-sm mb-2 uppercase tracking-wide">Migration ROI</h3>
    <div className="w-full max-w-[100px] aspect-square rounded-full border-8 border-gray-200 relative mb-2">
      <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
      <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-gray-800">+65%</div>
    </div>
    <div className="flex gap-2 text-[10px] font-bold text-gray-500">
      <span className="flex items-center"><span className="w-2 h-2 bg-green-500 inline-block mr-1"></span>Savings</span>
      <span className="flex items-center"><span className="w-2 h-2 bg-gray-300 inline-block mr-1"></span>Cost</span>
    </div>
  </div>
);

const VisualDashboardAlert = () => (
  <div className="w-full h-full bg-slate-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-2 shrink-0 min-h-[180px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs">🛡️</div>
        <span className="font-bold text-gray-700 text-sm">Fraud Alert</span>
      </div>
      <span className="text-[10px] text-gray-400">Just now</span>
    </div>
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex-1 flex flex-col justify-center">
      <div className="text-red-500 text-[10px] font-bold uppercase mb-1">Spike Detected</div>
      <div className="text-2xl font-black text-red-700">420% 📈</div>
      <div className="text-red-600 text-[10px]">Chargeback rate (72h)</div>
    </div>
    <div className="flex gap-2 h-1.5 mt-1">
      <div className="h-full flex-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[85%]"></div></div>
    </div>
  </div>
);

const renderVisual = (type) => {
  switch (type) {
    case 'invoice': return <VisualInvoice />;
    case 'chartDown': return <VisualChartDown />;
    case 'videoCall': return <VisualVideoCall />;
    case 'presentation': return <VisualPresentation />;
    case 'dashboardAlert': return <VisualDashboardAlert />;
    default: return <div className="w-full h-full min-h-[150px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs">No Visual</div>;
  }
};

const listeningDataBase = [
  {
    text: "The recent discrepancy in the settlement report requires immediate attention from the compliance team.",
    hint: "Sự sai lệch gần đây trong báo cáo quyết toán cần sự chú ý ngay lập tức từ team tuân thủ.",
    explanation: "Dạ anh, ở câu này có 3 từ khóa cực kỳ quan trọng anh cần lưu ý nhé:\n• Discrepancy (n): Sự sai lệch, không khớp số liệu.\n• Settlement report: Báo cáo quyết toán (nơi chốt dòng tiền).\n• Compliance team: Đội ngũ tuân thủ pháp lý."
  },
  {
    text: "Our overhead costs have fluctuated substantially during this quarter.",
    hint: "Chi phí cố định của chúng ta đã dao động đáng kể trong quý này.",
    explanation: "Anh nghe có chuẩn không ạ? Câu này anh chỉ cần nắm chắc 3 cụm này là ăn điểm giao tiếp nè:\n• Overhead costs: Chi phí cố định (mặt bằng, điện nước, vận hành...).\n• Fluctuate (v): Biến động, dao động lên xuống.\n• Substantially (adv): Một cách đáng kể, mức độ lớn."
  }
];

const formatTime = (secs) => {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const parseVocabPaste = (text) => {
  let cat = 'Mới thêm';
  const catMatch = text.match(/\d+\.\s*([^\n(\r]+)/);
  if (catMatch) cat = catMatch[1].trim();

  // Try block format first (entries separated by blank lines)
  const blocks = text.split(/\n[ \t]*\n/);
  const blockResults = [];

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const firstLine = lines[0];
    const ipaMatch = firstLine.match(/\/[^/]+\//);
    if (!ipaMatch) continue;

    const ipaIndex = firstLine.indexOf(ipaMatch[0]);
    const beforeIpa = firstLine.substring(0, ipaIndex).trim();
    const afterIpa = firstLine.substring(ipaIndex + ipaMatch[0].length).trim();

    // Strip leading digits
    const wordMatch = beforeIpa.match(/^[\d\s]*([A-Za-z][a-zA-Z\s]{0,30}?)\s*$/);
    if (!wordMatch) continue;
    const word = wordMatch[1].trim();
    if (!word) continue;

    // Strip (pos) - prefix, then take Vietnamese part
    const viRaw = afterIpa.replace(/^\s*\([^)]+\)\s*[-–]?\s*/, '').replace(/^\s*[-–]\s*/, '').trim();
    const enSentenceIdx = viRaw.search(/[A-Z][^.!?]{4,}[.!?]/);
    const vi = enSentenceIdx > 0 ? viRaw.substring(0, enSentenceIdx).trim() : viRaw;

    // Find example in remaining lines
    let ex = '';
    for (let i = 1; i < lines.length; i++) {
      const exMatch = lines[i].match(/^(?:Ví dụ|Example|Ex)[:\s]+(.+)/i);
      if (exMatch) { ex = exMatch[1].trim(); break; }
      // Fallback: line starts with uppercase English
      if (!ex && /^[A-Z]/.test(lines[i]) && !/^[A-ZĐẮẶẦ]/.test(lines[i].replace(/[A-Za-z]/g, ''))) {
        ex = lines[i];
      }
    }
    // If still no ex but there's one embedded in viRaw
    if (!ex && enSentenceIdx > 0) {
      ex = viRaw.substring(enSentenceIdx).trim();
    }

    blockResults.push({ cat, word, ipa: ipaMatch[0].trim(), vi, ex, hint: '' });
  }

  if (blockResults.length > 0) return blockResults;

  // Fallback: line-by-line (old inline format, e.g. "16Persuade/IPA/Vietnamese Example...")
  const results = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim() || line.match(/^STT|^Từ vựng/i)) continue;
    const ipaMatch = line.match(/\/[^/]+\//);
    if (!ipaMatch) continue;

    const ipaIndex = line.indexOf(ipaMatch[0]);
    const beforeIpa = line.substring(0, ipaIndex);
    const afterIpa = line.substring(ipaIndex + ipaMatch[0].length).trim();

    const wordMatch = beforeIpa.match(/\d+\s*([A-Za-z][a-zA-Z\s]{0,30}?)\s*$/);
    if (!wordMatch) continue;
    const word = wordMatch[1].trim();
    if (!word) continue;

    const exMatch = afterIpa.match(/([A-Z][^.!?]*[.!?])/);
    const viText = exMatch ? afterIpa.substring(0, afterIpa.indexOf(exMatch[0])).trim() : afterIpa.trim();
    const exText = exMatch ? exMatch[0].trim() : '';

    results.push({ cat, word, ipa: ipaMatch[0].trim(), vi: viText, ex: exText, hint: '' });
  }

  return results;
};

export default function App() {
  const [activeModule, setActiveModule] = useState(() => {
    const modules = ['vocab', 'listen', 'speak', 'read', 'write'];
    return modules[Math.floor(Math.random() * modules.length)];
  });
  const [toastMsg, setToastMsg] = useState('');

  const [allVocab, setAllVocab] = useState(() => {
    try {
      const extra = JSON.parse(localStorage.getItem('extraVocab') || '[]');
      const base = [...vocabData];
      const seen = new Set(base.map(v => v.word.toLowerCase()));
      for (const item of extra) {
        if (!seen.has(item.word.toLowerCase())) {
          base.push(item);
          seen.add(item.word.toLowerCase());
        }
      }
      return base;
    } catch {
      return [...vocabData];
    }
  });

  const [writingData, setWritingData] = useState(() => {
    try {
      const extra = JSON.parse(localStorage.getItem('extraWritingData') || '[]');
      const safe = extra.filter(r => r && typeof r.title === 'string' && typeof r.context === 'string' && typeof r.task === 'string');
      return [...initialWritingData, ...safe];
    } catch { return [...initialWritingData]; }
  });
  const [speakingData, setSpeakingData] = useState(() => {
    try {
      const extra = JSON.parse(localStorage.getItem('extraSpeakingData') || '[]');
      const safe = extra.filter(r => r && typeof r.title === 'string' && typeof r.context === 'string' && typeof r.role === 'string');
      return [...initialSpeakingData, ...safe];
    } catch { return [...initialSpeakingData]; }
  });
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);

  const [allListeningData, setAllListeningData] = useState(() => {
    try {
      const extra = JSON.parse(localStorage.getItem('extraListeningData') || '[]');
      const safe = extra.filter(r => r && typeof r.text === 'string');
      return [...listeningDataBase, ...safe];
    } catch { return [...listeningDataBase]; }
  });

  const [allRunningPlaylist, setAllRunningPlaylist] = useState(() => {
    try {
      const extra = JSON.parse(localStorage.getItem('extraRunningPlaylist') || '[]');
      const safe = extra.filter(r => r && typeof r.en === 'string');
      return [...runningPlaylistBase, ...safe];
    } catch { return [...runningPlaylistBase]; }
  });

  const [allReadingData, setAllReadingData] = useState(() => {
    try {
      const extra = JSON.parse(localStorage.getItem('extraReadingData') || '[]');
      const safe = extra
        .filter(r => r && typeof r.title === 'string' && typeof r.content === 'string')
        .map(r => ({
          ...r,
          options: Array.isArray(r.options) && r.options.length >= 2 ? r.options : ['A', 'B', 'C', 'D'],
          answerIdx: typeof r.answerIdx === 'number' ? r.answerIdx : 0,
          explanation: r.explanation || '',
          sampleSentence: r.sampleSentence || '',
          question: r.question || 'What is the main topic?',
          visualType: r.visualType || 'dashboardAlert',
        }));
      return [...readingData, ...safe];
    } catch { return [...readingData]; }
  });

  const [injectProgress, setInjectProgress] = useState(null);
  const allRunningPlaylistRef = useRef([]);

  const [showAddVocab, setShowAddVocab] = useState(false);
  const [addVocabText, setAddVocabText] = useState('');
  const [parsedPreview, setParsedPreview] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleRandomModule = () => {
    const modules = ['vocab', 'listen', 'speak', 'read', 'write'];
    const random = modules[Math.floor(Math.random() * modules.length)];
    setActiveModule(random);
    showToast(`Đã chuyển sang ngẫu nhiên: ${random.toUpperCase()}`);
  };

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    } else {
      showToast("Trình duyệt không hỗ trợ phát âm.");
    }
  };

  const formatAIResponse = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-2">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const handleParseVocab = () => {
    const parsed = parseVocabPaste(addVocabText);
    if (parsed.length === 0) {
      showToast("Không tìm thấy từ nào. Kiểm tra format có IPA /.../ không?");
    }
    setParsedPreview(parsed);
  };

  async function injectVocabIntoSkills(newItems) {
    const wordsWithEx = newItems.filter(v => v.ex);

    // Save starting indices BEFORE adding, so we can navigate to new content
    const listenStartIdx = allListeningData.length;
    const readStartIdx = allReadingData.length;
    const speakStartIdx = speakingData.length;
    const writeStartIdx = writingData.length;

    // Listen dictation (no AI needed)
    if (wordsWithEx.length > 0) {
      const newListening = wordsWithEx.map(item => ({
        text: item.ex,
        hint: item.vi,
        explanation: `• ${item.word} ${item.ipa}: ${item.vi}\nVí dụ: "${item.ex}"`
      }));
      const prev = JSON.parse(localStorage.getItem('extraListeningData') || '[]');
      localStorage.setItem('extraListeningData', JSON.stringify([...prev, ...newListening]));
      setAllListeningData(p => [...p, ...newListening]);
      setListenIdx(listenStartIdx);
      setListenInput('');
      setShowListenAnswer(false);
      setInjectProgress(p => ({ ...p, listen: `✅ Nghe: +${newListening.length} câu mới` }));
    }

    // Running playlist (no AI needed)
    if (wordsWithEx.length > 0) {
      const prevRun = JSON.parse(localStorage.getItem('extraRunningPlaylist') || '[]');
      const nextId = runningPlaylistBase.length + prevRun.length + 1;
      const newRunning = wordsWithEx.map((item, i) => ({ id: nextId + i, en: item.ex, vi: item.vi }));
      localStorage.setItem('extraRunningPlaylist', JSON.stringify([...prevRun, ...newRunning]));
      setAllRunningPlaylist(p => [...p, ...newRunning]);
      setInjectProgress(p => ({ ...p, running: `✅ Chạy bộ: +${newRunning.length} câu mới` }));
    }

    // Gemini calls — geminiJSON and geminiUrl are module-level to avoid rolldown TDZ bug
    const vocabForPrompt = newItems.map(v => `"${v.word}" (${v.vi}${v.ex ? ` — ví dụ: ${v.ex}` : ''})`).join('; ');

    const [readRes, speakRes, writeRes] = await Promise.allSettled([
      geminiJSON(`You are a Business English teacher. Create a reading comprehension exercise where the passage MUST naturally use these vocabulary words: ${vocabForPrompt}.
The passage should be a realistic business memo/email (3-5 sentences) that incorporates the words above.
Reply with ONLY valid JSON (no markdown, no code block):
{"title":"memo title","content":"passage using the vocab words","question":"comprehension question about the passage","options":["A: ...","B: ...","C: ...","D: ..."],"answerIdx":1,"explanation":"Giải thích bằng tiếng Việt tại sao đáp án đúng, highlight từ vựng liên quan","sampleSentence":"1 câu ví dụ dùng từ vựng chính","visualType":"dashboardAlert"}`),

      geminiJSON(`Bạn là giáo viên tiếng Anh thương mại. Tạo 1 tình huống giao tiếp (role-play) yêu cầu người học PHẢI dùng các từ vựng sau trong câu trả lời: ${vocabForPrompt}.
Chỉ trả về JSON hợp lệ (không markdown, không code block):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh tình huống bằng tiếng Việt (2-3 câu), đề cập tới các từ vựng cần dùng","role":"Nhiệm vụ cụ thể của người học bằng tiếng Việt, yêu cầu dùng các từ vựng trên","visualType":"videoCall"}`),

      geminiJSON(`Bạn là giáo viên tiếng Anh thương mại. Tạo 1 tình huống viết email yêu cầu người học PHẢI dùng các từ vựng sau trong email: ${vocabForPrompt}.
Chỉ trả về JSON hợp lệ (không markdown, không code block):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh bằng tiếng Việt (2-3 câu), đề cập từ vựng cần dùng","task":"Yêu cầu viết email cụ thể bằng tiếng Việt, nêu rõ phải dùng từ nào","visualType":"invoice"}`),
    ]);

    // Process reading
    if (readRes.status === 'fulfilled') {
      try {
        const r = readRes.value;
        if (!Array.isArray(r.options) || r.options.length < 2) r.options = ['Option A', 'Option B', 'Option C', 'Option D'];
        if (typeof r.answerIdx !== 'number') r.answerIdx = 0;
        const prev = JSON.parse(localStorage.getItem('extraReadingData') || '[]');
        localStorage.setItem('extraReadingData', JSON.stringify([...prev, r]));
        setAllReadingData(p => [...p, r]);
        setReadIdx(readStartIdx);
        setReadAnswered(null);
        setInjectProgress(p => ({ ...p, read: '✅ Đọc hiểu: Đã tạo bài mới' }));
      } catch (e) { setInjectProgress(p => ({ ...p, read: `❌ Đọc hiểu: parse lỗi — ${e.message}` })); }
    } else {
      setInjectProgress(p => ({ ...p, read: `❌ Đọc hiểu: ${readRes.reason?.message || 'Lỗi API'}` }));
    }

    // Process speaking
    if (speakRes.status === 'fulfilled') {
      try {
        const r = speakRes.value;
        const prev = JSON.parse(localStorage.getItem('extraSpeakingData') || '[]');
        localStorage.setItem('extraSpeakingData', JSON.stringify([...prev, r]));
        setSpeakingData(p => [...p, r]);
        setSpeakIdx(speakStartIdx);
        setSpeakTranscript('');
        setSpeakFeedback(null);
        setInjectProgress(p => ({ ...p, speak: '✅ Nói: Đã tạo tình huống mới' }));
      } catch (e) { setInjectProgress(p => ({ ...p, speak: `❌ Nói: ${e.message}` })); }
    } else {
      setInjectProgress(p => ({ ...p, speak: `❌ Nói: ${speakRes.reason?.message || 'Lỗi API'}` }));
    }

    // Process writing
    if (writeRes.status === 'fulfilled') {
      try {
        const r = writeRes.value;
        const prev = JSON.parse(localStorage.getItem('extraWritingData') || '[]');
        localStorage.setItem('extraWritingData', JSON.stringify([...prev, r]));
        setWritingData(p => [...p, r]);
        setWriteIdx(writeStartIdx);
        setWriteInput('');
        setWriteFeedback(null);
        setInjectProgress(p => ({ ...p, write: '✅ Viết: Đã tạo tình huống mới' }));
      } catch (e) { setInjectProgress(p => ({ ...p, write: `❌ Viết: ${e.message}` })); }
    } else {
      setInjectProgress(p => ({ ...p, write: `❌ Viết: ${writeRes.reason?.message || 'Lỗi API'}` }));
    }
  }

  async function handleConfirmAddVocab() {
    if (!parsedPreview || parsedPreview.length === 0) return;
    const existing = new Set(allVocab.map(v => v.word.toLowerCase()));
    const newItems = parsedPreview.filter(v => !existing.has(v.word.toLowerCase()));
    const skipped = parsedPreview.length - newItems.length;

    if (newItems.length > 0) {
      try {
        const currentExtra = JSON.parse(localStorage.getItem('extraVocab') || '[]');
        localStorage.setItem('extraVocab', JSON.stringify([...currentExtra, ...newItems]));
      } catch {}
      setAllVocab(prev => [...prev, ...newItems]);
    }

    const wordsWithEx = newItems.filter(v => v.ex);
    const progress = {
      vocab: `✅ Vocab: +${newItems.length} từ${skipped > 0 ? ` (bỏ ${skipped} trùng)` : ''}`,
      listen: wordsWithEx.length > 0 ? '⏳ Nghe: đang thêm...' : null,
      running: wordsWithEx.length > 0 ? '⏳ Chạy bộ: đang thêm...' : null,
      read: newItems.length > 0 ? '⏳ Đọc hiểu: Gemini đang tạo...' : null,
      speak: newItems.length > 0 ? '⏳ Nói: Gemini đang tạo...' : null,
      write: newItems.length > 0 ? '⏳ Viết: Gemini đang tạo...' : null,
    };
    setInjectProgress(progress);
    setParsedPreview(null);
    setAddVocabText('');

    if (newItems.length > 0) await injectVocabIntoSkills(newItems);
    // Modal stays open so user can read results — they close it manually
  }

  // ── Vocab state ──
  const [vocabMode, setVocabMode] = useState('flashcard');
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswered, setQuizAnswered] = useState(null);

  const generateQuiz = () => {
    const currentWord = allVocab[cardIdx];
    let options = [currentWord.word];
    let attempts = 0;
    while (options.length < 4 && attempts < 50) {
      const randomWord = allVocab[Math.floor(Math.random() * allVocab.length)].word;
      if (!options.includes(randomWord)) options.push(randomWord);
      attempts++;
    }
    setQuizOptions(options.sort(() => Math.random() - 0.5));
    setQuizAnswered(null);
  };

  useEffect(() => {
    if (activeModule === 'vocab' && vocabMode === 'quiz') generateQuiz();
  }, [cardIdx, activeModule, vocabMode]);

  const handleQuizAnswer = (selected) => {
    if (quizAnswered) return;
    setQuizAnswered(selected);
    if (selected === allVocab[cardIdx].word) {
      setQuizScore(prev => prev + 1);
    }
  };

  // ── Listen state ──
  const [listenTabMode, setListenTabMode] = useState('dictation');
  const [listenIdx, setListenIdx] = useState(() => {
    try {
      const saved = localStorage.getItem('lastListenIdx');
      if (saved !== null) {
        const extra = JSON.parse(localStorage.getItem('extraListeningData') || '[]');
        const max = listeningDataBase.length + extra.length - 1;
        const n = parseInt(saved, 10); return Math.min(isNaN(n) ? 0 : n, max);
      }
      const extra = JSON.parse(localStorage.getItem('extraListeningData') || '[]');
      return extra.length > 0 ? listeningDataBase.length + extra.length - 1 : 0;
    } catch { return 0; }
  });
  const [listenInput, setListenInput] = useState('');
  const [showListenAnswer, setShowListenAnswer] = useState(false);

  // ── Running mode state ──
  const [runIdx, setRunIdx] = useState(0);
  const [runPlaying, setRunPlaying] = useState(false);
  const [runSeconds, setRunSeconds] = useState(0);
  const [runFinished, setRunFinished] = useState(false);
  const runTimerRef = useRef(null);
  const runSpeakTimeoutRef = useRef(null);
  const runIdxRef = useRef(0);

  const speakAndAdvance = (idx) => {
    const playlist = allRunningPlaylistRef.current;
    if (idx >= playlist.length) {
      setRunPlaying(false);
      setRunFinished(true);
      clearInterval(runTimerRef.current);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(playlist[idx].en);
    utterance.rate = 0.85;
    utterance.lang = 'en-US';
    utterance.onend = () => {
      runSpeakTimeoutRef.current = setTimeout(() => {
        const next = runIdxRef.current + 1;
        runIdxRef.current = next;
        setRunIdx(next);
        speakAndAdvance(next);
      }, 5000);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleRunPlay = () => {
    if (runFinished) {
      runIdxRef.current = 0;
      setRunIdx(0);
      setRunSeconds(0);
      setRunFinished(false);
    }
    setRunPlaying(true);
    runTimerRef.current = setInterval(() => setRunSeconds(s => s + 1), 1000);
    speakAndAdvance(runIdxRef.current);
  };

  const handleRunPause = () => {
    setRunPlaying(false);
    window.speechSynthesis.cancel();
    clearTimeout(runSpeakTimeoutRef.current);
    clearInterval(runTimerRef.current);
  };

  const handleRunSkip = () => {
    window.speechSynthesis.cancel();
    clearTimeout(runSpeakTimeoutRef.current);
    const next = runIdxRef.current + 1;
    runIdxRef.current = next;
    setRunIdx(next);
    if (runPlaying) speakAndAdvance(next);
  };

  const handleRunStop = () => {
    window.speechSynthesis.cancel();
    clearTimeout(runSpeakTimeoutRef.current);
    clearInterval(runTimerRef.current);
    setRunPlaying(false);
    runIdxRef.current = 0;
    setRunIdx(0);
    setRunSeconds(0);
    setRunFinished(false);
  };

  useEffect(() => { allRunningPlaylistRef.current = allRunningPlaylist; }, [allRunningPlaylist]);
  useEffect(() => { localStorage.setItem('lastListenIdx', listenIdx); }, [listenIdx]);
  useEffect(() => { localStorage.setItem('lastReadIdx', readIdx); }, [readIdx]);
  useEffect(() => { localStorage.setItem('lastSpeakIdx', speakIdx); }, [speakIdx]);
  useEffect(() => { localStorage.setItem('lastWriteIdx', writeIdx); }, [writeIdx]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      clearTimeout(runSpeakTimeoutRef.current);
      clearInterval(runTimerRef.current);
    };
  }, []);

  // ── Read state ──
  const [readIdx, setReadIdx] = useState(() => {
    try {
      const saved = localStorage.getItem('lastReadIdx');
      if (saved !== null) {
        const extra = JSON.parse(localStorage.getItem('extraReadingData') || '[]');
        const max = readingData.length + extra.length - 1;
        const n = parseInt(saved, 10); return Math.min(isNaN(n) ? 0 : n, max);
      }
      const extra = JSON.parse(localStorage.getItem('extraReadingData') || '[]');
      return extra.length > 0 ? readingData.length + extra.length - 1 : 0;
    } catch { return 0; }
  });
  const [readAnswered, setReadAnswered] = useState(null);

  // ── Speak state ──
  const [speakIdx, setSpeakIdx] = useState(() => {
    try {
      const saved = localStorage.getItem('lastSpeakIdx');
      if (saved !== null) {
        const extra = JSON.parse(localStorage.getItem('extraSpeakingData') || '[]');
        const max = initialSpeakingData.length + extra.length - 1;
        const n = parseInt(saved, 10); return Math.min(isNaN(n) ? 0 : n, max);
      }
      const extra = JSON.parse(localStorage.getItem('extraSpeakingData') || '[]');
      return extra.length > 0 ? initialSpeakingData.length + extra.length - 1 : 0;
    } catch { return 0; }
  });
  const [speakTranscript, setSpeakTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingGrading, setIsSpeakingGrading] = useState(false);
  const [speakFeedback, setSpeakFeedback] = useState(null);
  const recognitionRef = useRef(null);

  const toggleRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Trình duyệt không hỗ trợ Mic. Anh gõ tạm nhé!");
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setSpeakTranscript('');
      setSpeakFeedback(null);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = false;
      recognitionRef.current.onstart = () => setIsRecording(true);
      recognitionRef.current.onend = () => setIsRecording(false);
      recognitionRef.current.onresult = (event) => {
        const transcriptText = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        setSpeakTranscript(transcriptText);
      };
      recognitionRef.current.start();
    }
  };

  async function handleGradeSpeaking() {
    if (!speakTranscript.trim()) { showToast("Anh chưa thu âm!"); return; }
    setIsSpeakingGrading(true);
    setSpeakFeedback(null);
    try {
      const prompt = `Act as an expert Business English Coach evaluated spoken responses.
Context: ${speakingData[speakIdx].context}
User Role: ${speakingData[speakIdx].role}
User's spoken transcript: "${speakTranscript}"

Provide feedback in Vietnamese playing the role of a friendly female assistant named "Tiểu Nguyên".
Address the user as "anh" and use "em".
Format exactly like this:
Dạ anh, em Tiểu Nguyên đây. Về câu phản xạ của anh, em có vài nhận xét nha:
[1-2 sentences of friendly feedback]
Để mượt hơn và chuẩn sếp (Executive), anh nên nói thế này ạ:
**[Provide ONE polished, natural, executive-level English sentence to say in this situation]**`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const result = await response.json();
      if (result.candidates?.[0]?.content) {
        setSpeakFeedback(result.candidates[0].content.parts[0].text);
      } else {
        setSpeakFeedback("Hệ thống không thể chấm điểm lúc này. Anh thử lại sau nhé.");
      }
    } catch {
      setSpeakFeedback("Dạ hệ thống AI đang bảo trì, anh thông cảm nhé!");
    }
    setIsSpeakingGrading(false);
  }

  async function handleGenerateSpeakingScenario() {
    setIsGeneratingNew(true);
    showToast("Tiểu Nguyên đang nghĩ tình huống giao tiếp mới...");
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `Tạo 1 tình huống giao tiếp (speaking) tiếng Anh thương mại về mảng Fintech/Business (khác với những cái đã có). Chỉ trả về JSON hợp lệ (không markdown):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh bằng tiếng Việt (2-3 câu)","role":"Nhiệm vụ người học bằng tiếng Việt","visualType":"videoCall"}` }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const newScenario = JSON.parse(result.candidates[0].content.parts[0].text);
        const prev = JSON.parse(localStorage.getItem('extraSpeakingData') || '[]');
        localStorage.setItem('extraSpeakingData', JSON.stringify([...prev, newScenario]));
        setSpeakingData(p => [...p, newScenario]);
        setSpeakIdx(speakingData.length);
        setSpeakTranscript('');
        setSpeakFeedback(null);
        showToast("Đã tạo xong tình huống Giao Tiếp!");
      } else {
        showToast("Có lỗi kết nối AI, anh thử lại nhé.");
      }
    } catch {
      showToast("Có lỗi kết nối AI, anh thử lại nhé.");
    }
    setIsGeneratingNew(false);
  }

  // ── Write state ──
  const [writeIdx, setWriteIdx] = useState(() => {
    try {
      const saved = localStorage.getItem('lastWriteIdx');
      if (saved !== null) {
        const extra = JSON.parse(localStorage.getItem('extraWritingData') || '[]');
        const max = initialWritingData.length + extra.length - 1;
        const n = parseInt(saved, 10); return Math.min(isNaN(n) ? 0 : n, max);
      }
      const extra = JSON.parse(localStorage.getItem('extraWritingData') || '[]');
      return extra.length > 0 ? initialWritingData.length + extra.length - 1 : 0;
    } catch { return 0; }
  });
  const [writeInput, setWriteInput] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [writeFeedback, setWriteFeedback] = useState(null);

  async function handleGradeWriting() {
    if (!writeInput.trim()) { showToast("Anh chưa nhập nội dung!"); return; }
    setIsGrading(true);
    setWriteFeedback(null);
    try {
      const prompt = `Act as an expert Business English Coach.
Context: ${writingData[writeIdx].context}
Task: ${writingData[writeIdx].task}
User's Draft: "${writeInput}"

Provide feedback in Vietnamese acting as the assistant 'Tiểu Nguyên'.
Address user as 'anh' and use 'em'.
Format:
Dạ anh, em nhận được bản nháp rồi. Em xin phép góp ý:
1. **Đánh giá chung**: (Ưu/nhược điểm).
2. **Lỗi cần sửa**: (Lỗi ngữ pháp).
Bản sửa chuẩn Executive:
**[Provide full rewritten English text]**`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const result = await response.json();
      if (result.candidates?.[0]?.content) {
        setWriteFeedback(result.candidates[0].content.parts[0].text);
      } else {
        setWriteFeedback("Hệ thống lỗi. Vui lòng thử lại.");
      }
    } catch {
      setWriteFeedback("Lỗi kết nối AI. Thử lại sau.");
    }
    setIsGrading(false);
  }

  async function handleGenerateWritingScenario() {
    setIsGeneratingNew(true);
    showToast("Tiểu Nguyên đang nghĩ chủ đề Email mới...");
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `Tạo 1 tình huống yêu cầu soạn email tiếng Anh thương mại về mảng Fintech/Business (khác với những cái đã có). Chỉ trả về JSON hợp lệ (không markdown):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh bằng tiếng Việt (2-3 câu)","task":"Yêu cầu viết email cụ thể bằng tiếng Việt","visualType":"invoice"}` }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const newScenario = JSON.parse(result.candidates[0].content.parts[0].text);
        const prev = JSON.parse(localStorage.getItem('extraWritingData') || '[]');
        localStorage.setItem('extraWritingData', JSON.stringify([...prev, newScenario]));
        setWritingData(p => [...p, newScenario]);
        setWriteIdx(writingData.length);
        setWriteInput('');
        setWriteFeedback(null);
        showToast("Đã tạo xong tình huống Viết Email!");
      } else {
        showToast("Có lỗi kết nối AI, anh thử lại nhé.");
      }
    } catch {
      showToast("Có lỗi kết nối AI, anh thử lại nhé.");
    }
    setIsGeneratingNew(false);
  }

  // ── Render: Vocab ──
  const renderVocab = () => {
    if (!allVocab[cardIdx]) return <div className="flex items-center justify-center h-full text-gray-400 text-sm">Đang tải từ vựng...</div>;
    return (
    <div className="animate-fade-in flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto py-2">
      <div className="flex justify-between items-center w-full mb-3 shrink-0">
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 flex-1 mr-3 shadow-sm">
          <button onClick={() => setVocabMode('flashcard')} className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${vocabMode === 'flashcard' ? 'bg-white text-blue-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>Flashcard</button>
          <button onClick={() => { setVocabMode('quiz'); setQuizScore(0); }} className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${vocabMode === 'quiz' ? 'bg-white text-blue-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>Quiz Test</button>
        </div>
        <button onClick={() => setShowAddVocab(true)} className="flex items-center gap-1 text-xs font-semibold text-blue-600 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition shadow-sm shrink-0">
          <IconPlus /> Thêm từ
        </button>
      </div>

      <div className="w-full flex justify-between items-end mb-2 shrink-0">
        <h2 className="text-sm font-bold text-gray-800">{vocabMode === 'flashcard' ? 'Luyện Phản Xạ' : `Test Trí Nhớ (Điểm: ${quizScore})`}</h2>
        <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs border border-blue-100">{cardIdx + 1} / {allVocab.length}</span>
      </div>

      {vocabMode === 'flashcard' ? (
        <div className="w-full flex-1 min-h-[180px] cursor-pointer" style={{ perspective: '1000px' }} onClick={() => setIsFlipped(!isFlipped)}>
          <div className="w-full h-full relative transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            <div className="absolute inset-0 bg-white border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 hover:border-blue-300 shadow-md transition-colors" style={{ backfaceVisibility: 'hidden' }}>
              <span className="text-xs font-bold uppercase text-gray-500 mb-2 bg-gray-100 px-2 py-0.5 rounded-full">{allVocab[cardIdx].cat}</span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 text-center tracking-tight">{allVocab[cardIdx].word}</h3>
              <p className="text-sm text-blue-500 font-mono mb-2">{allVocab[cardIdx].ipa}</p>
              <div className="absolute bottom-3 w-full px-4 flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShowHint(!showHint)} className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-amber-100 transition border border-amber-100">
                  <IconLightbulb /> {showHint ? "Ẩn gợi ý" : "Xem gợi ý"}
                </button>
                <button onClick={() => playAudio(allVocab[cardIdx].word)} className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors shadow-sm"><IconPlay /></button>
              </div>
              {showHint && (
                <div className="absolute bottom-12 w-full px-4 text-center animate-fade-in" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs text-gray-600 bg-amber-50/50 p-2 rounded-xl border border-amber-100 italic font-medium">{allVocab[cardIdx].hint}</p>
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex flex-col items-center justify-center p-4 text-center shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <h3 className="text-xl font-bold text-white mb-3">{allVocab[cardIdx].vi}</h3>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl w-full text-left border border-white/20">
                <p className="text-blue-200 text-[10px] font-bold uppercase mb-1 tracking-wider">Ví dụ</p>
                <p className="text-white font-medium text-sm leading-relaxed">"{allVocab[cardIdx].ex}"</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl p-3 shadow-sm text-center overflow-y-auto min-h-0">
          <p className="text-gray-500 text-xs mb-1 font-medium shrink-0">Chọn từ tiếng Anh có nghĩa là:</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2 shrink-0">"{allVocab[cardIdx].vi}"</h3>
          <div className="grid grid-cols-1 gap-1.5 shrink-0">
            {quizOptions.map((opt, i) => {
              let btnStyle = "bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-blue-700 border-gray-200 hover:border-blue-300";
              if (quizAnswered) {
                if (opt === allVocab[cardIdx].word) { btnStyle = "bg-green-100 border-green-500 text-green-800 shadow-sm font-bold"; }
                else if (opt === quizAnswered) { btnStyle = "bg-red-100 border-red-400 text-red-800 shadow-sm"; }
                else { btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50"; }
              }
              return (
                <button key={i} disabled={quizAnswered !== null} onClick={() => handleQuizAnswer(opt)} className={`py-2 rounded-xl transition-all border shadow-sm flex items-center justify-between px-3 text-xs ${btnStyle}`}>
                  <span className="font-semibold">{opt}</span>
                  {quizAnswered && opt === allVocab[cardIdx].word && <IconCheck />}
                  {quizAnswered && opt === quizAnswered && opt !== allVocab[cardIdx].word && <IconX />}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className="mt-2 text-left animate-fade-in bg-blue-50 border border-blue-100 rounded-2xl p-3 shadow-sm relative overflow-hidden shrink-0">
              <div className="flex items-center gap-2 mb-1.5 border-b border-blue-200 pb-1.5">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-200">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-[10px]">AI</span>
                </div>
                <h4 className="text-blue-800 font-bold text-xs">Tiểu Nguyên giải thích:</h4>
              </div>
              <p className="text-gray-700 text-xs mb-1">
                {quizAnswered === allVocab[cardIdx].word
                  ? <span className="text-green-700 font-bold">Chính xác! </span>
                  : <span className="text-red-600 font-bold">Chưa đúng. </span>}
                Từ đúng là <strong className="text-blue-700">{allVocab[cardIdx].word}</strong>
                <span className="text-gray-500 ml-1.5 font-mono bg-white px-1 py-0.5 rounded border border-gray-200 text-[10px]">{allVocab[cardIdx].ipa}</span>
                {' '}— <span className="text-gray-600">{allVocab[cardIdx].vi}</span>
              </p>
              <div className="bg-white p-2 rounded-lg border border-blue-100 flex justify-between items-center mt-1.5">
                <p className="text-gray-600 text-xs italic w-[85%]">"{allVocab[cardIdx].ex}"</p>
                <button onClick={() => playAudio(allVocab[cardIdx].ex)} className="text-blue-500 hover:text-blue-700"><IconPlay /></button>
              </div>
              <button onClick={() => setCardIdx((prev) => (prev + 1) % allVocab.length)} className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-xs font-bold transition-colors shadow-md shadow-blue-500/30">
                Làm câu tiếp theo
              </button>
            </div>
          )}
        </div>
      )}

      {vocabMode === 'flashcard' && (
        <div className="flex justify-center items-center gap-3 mt-2 shrink-0 w-full">
          <button onClick={() => { setIsFlipped(false); setShowHint(false); setTimeout(() => setCardIdx((prev) => (prev - 1 + allVocab.length) % allVocab.length), 150); }} className="flex-1 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-700 font-bold text-xs transition-colors shadow-sm">Trước</button>
          <button onClick={() => { setIsFlipped(false); setShowHint(false); setTimeout(() => setCardIdx((prev) => (prev + 1) % allVocab.length), 150); }} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/30">Tiếp theo</button>
        </div>
      )}
    </div>
    );
  };

  // ── Render: Listen ──
  const renderListen = () => {
    if (!allListeningData[listenIdx]) return <div className="flex items-center justify-center h-full text-gray-400 text-sm">Đang tải bài nghe...</div>;
    return (
    <div className="animate-fade-in flex flex-col h-full w-full max-w-3xl mx-auto py-2">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2 shrink-0">
        <div className="p-1 bg-amber-100 text-amber-600 rounded-lg"><IconListen /></div> Luyện Nghe
      </h2>

      <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 mb-2 shrink-0">
        <button onClick={() => setListenTabMode('dictation')} className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${listenTabMode === 'dictation' ? 'bg-white text-amber-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>
          Chép Chính Tả
        </button>
        <button onClick={() => setListenTabMode('running')} className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${listenTabMode === 'running' ? 'bg-white text-green-600 shadow' : 'text-gray-500 hover:text-gray-800'}`}>
          🏃 Chạy Bộ
        </button>
      </div>

      {listenTabMode === 'dictation' && (
        <>
          <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-2 text-center relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
            <button onClick={() => playAudio(allListeningData[listenIdx].text)} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full p-3 inline-flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-amber-500/30 mb-2">
              <IconPlay />
            </button>
            <p className="text-gray-600 font-medium text-xs mb-1.5">Bấm Play, nghe câu nói của đối tác và gõ lại chính xác nội dung.</p>
            <p className="text-[11px] text-gray-500 italic bg-amber-50 inline-block px-3 py-1.5 rounded-full border border-amber-100">Hint: {allListeningData[listenIdx].hint}</p>
          </div>

          <textarea
            value={listenInput} onChange={(e) => setListenInput(e.target.value)}
            className="w-full flex-1 min-h-[64px] bg-white border border-gray-200 rounded-2xl p-3 text-gray-900 text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-2 outline-none shadow-inner"
            placeholder="Type exactly what you hear here..."
          />

          {showListenAnswer && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-3 mb-2 animate-fade-in shadow-sm relative shrink-0">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-green-700 font-bold text-xs uppercase tracking-wide">Đáp án:</p>
                <button onClick={() => playAudio(allListeningData[listenIdx].text)} className="text-green-700 hover:text-green-900"><IconPlay /></button>
              </div>
              <p className="text-gray-900 text-sm font-medium mb-2">{allListeningData[listenIdx].text}</p>
              <div className="bg-white rounded-xl p-2.5 border border-green-100 shadow-sm max-h-24 overflow-y-auto">
                <div className="flex items-center gap-1.5 mb-1 border-b border-green-50 pb-1">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shadow-sm border border-green-200">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 font-black text-[9px]">AI</span>
                  </div>
                  <h4 className="text-green-800 font-bold text-xs">Góc phân tích:</h4>
                </div>
                <p className="text-gray-700 whitespace-pre-line text-xs leading-relaxed font-mono">{allListeningData[listenIdx].explanation}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3 shrink-0">
            <button onClick={() => setShowListenAnswer(!showListenAnswer)} className="flex-1 py-2 bg-white hover:bg-gray-50 rounded-xl text-gray-700 font-bold text-xs border border-gray-300 transition shadow-sm">
              {showListenAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
            <button onClick={() => { setListenIdx((prev) => (prev + 1) % allListeningData.length); setListenInput(''); setShowListenAnswer(false); }} className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 rounded-xl text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5">
              Câu tiếp <IconRandom />
            </button>
          </div>
        </>
      )}

      {listenTabMode === 'running' && (
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 shrink-0">
            <div className="text-center">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Thời gian</p>
              <p className="text-2xl font-mono font-black text-gray-800">{formatTime(runSeconds)}</p>
            </div>
            <div className="flex-1 mx-3">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1 overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-700" style={{ width: `${(Math.min(runIdx, allRunningPlaylist.length) / allRunningPlaylist.length) * 100}%` }} />
              </div>
              <p className="text-xs text-gray-500 text-center">{Math.min(runIdx + 1, allRunningPlaylist.length)} / {allRunningPlaylist.length} câu</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Trạng thái</p>
              <p className={`text-xs font-bold ${runFinished ? 'text-blue-600' : runPlaying ? 'text-green-600' : 'text-gray-400'}`}>
                {runFinished ? 'Xong!' : runPlaying ? 'Đang phát' : 'Tạm dừng'}
              </p>
            </div>
          </div>

          {!runFinished && runIdx < allRunningPlaylist.length && (
            <div className="bg-white border-2 border-green-400 rounded-2xl p-3 shadow-md shrink-0">
              <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest mb-1">Đang phát</p>
              <p className="text-base font-semibold text-gray-800 leading-relaxed mb-1.5">{allRunningPlaylist[runIdx].en}</p>
              <p className="text-xs text-blue-700 italic border-t border-green-100 pt-1.5">{allRunningPlaylist[runIdx].vi}</p>
            </div>
          )}

          {!runFinished && runIdx + 1 < allRunningPlaylist.length && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-2.5 shrink-0">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Câu tiếp theo</p>
              <p className="text-xs text-gray-500 leading-relaxed">{allRunningPlaylist[runIdx + 1].en}</p>
            </div>
          )}

          {runFinished && (
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-300 rounded-2xl p-4 text-center shadow-md shrink-0">
              <p className="text-3xl mb-2">🎉</p>
              <p className="text-base font-black text-green-700 mb-1">Session hoàn thành!</p>
              <p className="text-xs text-green-600">Thời gian: <strong>{formatTime(runSeconds)}</strong> — {allRunningPlaylist.length} câu</p>
            </div>
          )}

          <div className="flex gap-3 shrink-0">
            <button
              onClick={runPlaying ? handleRunPause : handleRunPlay}
              className={`flex-1 h-12 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-95 transition-transform ${runPlaying ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {runPlaying ? '⏸ Tạm dừng' : runFinished ? '🔄 Chạy lại' : '▶ Bắt đầu'}
            </button>
            <button onClick={handleRunSkip} disabled={runFinished || runIdx >= allRunningPlaylist.length - 1} className="w-12 h-12 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl shadow-lg active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed">
              ⏭
            </button>
            <button onClick={handleRunStop} className="w-12 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-xl shadow-lg active:scale-95 transition-transform">
              ⏹
            </button>
          </div>

          <details className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shrink-0">
            <summary className="px-4 py-3 cursor-pointer text-sm font-semibold text-gray-600 hover:bg-gray-100 select-none">
              Xem tất cả {allRunningPlaylist.length} câu
            </summary>
            <div className="max-h-56 overflow-y-auto px-4 pb-4">
              {allRunningPlaylist.map((item, i) => (
                <div key={item.id} className={`py-2 border-b border-gray-100 last:border-0 text-sm ${i === runIdx && !runFinished ? 'text-green-700 font-semibold' : i < runIdx ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                  <span className="text-xs text-gray-400 mr-2 font-mono">{i + 1}.</span>{item.en}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
    );
  };

  // ── Render: Read ──
  const renderRead = () => {
    if (!allReadingData[readIdx]) return <div className="flex items-center justify-center h-full text-gray-400 text-sm">Đang tải bài đọc...</div>;
    return (
    <div className="animate-fade-in flex flex-col h-full w-full max-w-4xl mx-auto py-2">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2 shrink-0">
        <div className="p-1 bg-indigo-100 text-indigo-600 rounded-lg"><IconRead /></div> Đọc Hiểu Văn Bản
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-2 shrink-0">
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400"></div>
          <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1.5">{allReadingData[readIdx].title}</h3>
          <p className="text-gray-700 leading-relaxed text-xs font-serif">{allReadingData[readIdx].content}</p>
        </div>
        <div className="lg:col-span-2 hidden lg:block h-full">
          {renderVisual(allReadingData[readIdx].visualType)}
        </div>
      </div>

      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-3xl p-3 shadow-inner flex flex-col overflow-y-auto min-h-0">
        <p className="font-bold text-gray-900 mb-2 text-xs shrink-0">{allReadingData[readIdx].question}</p>
        <div className="flex flex-col gap-2 shrink-0">
          {allReadingData[readIdx].options.map((opt, i) => {
            const isCorrect = i === allReadingData[readIdx].answerIdx;
            const isSelected = readAnswered === i;
            let btnClass = "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200";
            let icon = null;
            if (readAnswered !== null) {
              if (isCorrect) { btnClass = "bg-green-50 border-green-400 text-green-800 shadow-sm font-bold"; icon = <IconCheck />; }
              else if (isSelected) { btnClass = "bg-red-50 border-red-300 text-red-800"; icon = <IconX />; }
              else { btnClass = "bg-white border-gray-200 text-gray-400 opacity-50"; }
            }
            return (
              <button key={i} disabled={readAnswered !== null} onClick={() => setReadAnswered(i)} className={`text-left p-3 rounded-2xl border transition-all flex justify-between items-center text-sm ${btnClass}`}>
                <span className="font-medium">{opt}</span>{icon && <span>{icon}</span>}
              </button>
            );
          })}
        </div>

        {readAnswered !== null && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-5 animate-fade-in shadow-sm relative shrink-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center gap-2 mb-2 border-b border-blue-100 pb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-200">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-xs">AI</span>
              </div>
              <h4 className="text-blue-800 font-bold text-sm">Tiểu Nguyên giải thích:</h4>
            </div>
            <p className="text-gray-800 leading-relaxed mb-3 text-xs font-medium">{allReadingData[readIdx].explanation}</p>

            {allReadingData[readIdx].sampleSentence && (
              <div className="mt-2 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-3 flex justify-between items-start gap-2">
                <div>
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide mb-1">Câu ví dụ thực chiến</p>
                  <p className="text-sm italic text-indigo-800">"{allReadingData[readIdx].sampleSentence}"</p>
                </div>
                <button onClick={() => playAudio(allReadingData[readIdx].sampleSentence)} className="text-indigo-400 hover:text-indigo-700 shrink-0 mt-1"><IconPlay /></button>
              </div>
            )}

            <div className="flex justify-end mt-3">
              <button onClick={() => { setReadIdx((prev) => (prev + 1) % allReadingData.length); setReadAnswered(null); }} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs font-bold shadow-md transition">Bài tiếp theo</button>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  // ── Render: Speak ──
  const renderSpeak = () => {
    if (!speakingData[speakIdx]) return <div className="flex items-center justify-center h-full text-gray-400 text-sm">Đang tải tình huống...</div>;
    return (
    <div className="animate-fade-in flex flex-col h-full w-full max-w-4xl mx-auto py-2">
      <div className="flex justify-between items-center mb-2 shrink-0">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <div className="p-1 bg-rose-100 text-rose-600 rounded-lg"><IconSpeak /></div> Luyện Nói (Voice AI)
        </h2>
        <button onClick={handleGenerateSpeakingScenario} disabled={isGeneratingNew} className="text-xs font-semibold text-rose-600 hover:text-rose-900 px-3 py-1.5 bg-rose-50 rounded-lg border border-rose-200 transition shadow-sm flex items-center gap-1">
          {isGeneratingNew ? <IconLoading /> : <IconSparkles />} Tạo Bằng AI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-2 shrink-0">
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400"></div>
          <h3 className="text-sm font-bold text-gray-900 mb-1.5">{speakingData[speakIdx].title}</h3>
          <p className="text-gray-700 text-xs mb-2 leading-relaxed"><strong className="text-gray-900">Bối cảnh:</strong> {speakingData[speakIdx].context}</p>
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-2">
            <p className="text-xs text-rose-800"><strong className="text-rose-600 block mb-0.5">Nhiệm vụ:</strong> {speakingData[speakIdx].role}</p>
          </div>
        </div>
        <div className="md:col-span-2 hidden md:block h-full">
          {renderVisual(speakingData[speakIdx].visualType)}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-3 shrink-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">🎙️ Thu âm phản hồi</span>
          <button onClick={toggleRecording} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-bold transition-all shadow-md ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-900'}`}>
            <IconMicOutline /> {isRecording ? "Đang thu âm..." : "Bấm để Nói"}
          </button>
        </div>
        <textarea
          value={speakTranscript} onChange={(e) => setSpeakTranscript(e.target.value)}
          className={`w-full flex-1 bg-gray-50 border p-3 rounded-2xl text-gray-900 text-sm resize-none outline-none transition-colors ${isRecording ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 focus:border-rose-400'}`}
          placeholder="Nhấn nút Micro và nói tiếng Anh, hoặc anh có thể gõ trực tiếp..."
        />
        <div className="mt-3 flex justify-between items-center shrink-0">
          <button onClick={() => { setSpeakIdx(prev => (prev + 1) % speakingData.length); setSpeakTranscript(''); setSpeakFeedback(null); }} className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg">Đổi tình huống</button>
          <button onClick={handleGradeSpeaking} disabled={isSpeakingGrading || isRecording} className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 shadow-md transition-colors ${isSpeakingGrading || isRecording ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}>
            {isSpeakingGrading ? <IconLoading /> : <IconSparkles />} Gửi AI Đánh Giá
          </button>
        </div>
      </div>

      {speakFeedback && (
        <div className="mt-2 bg-gradient-to-br from-rose-50 to-white border border-rose-200 rounded-3xl p-4 shadow-md animate-fade-in relative overflow-hidden shrink-0 max-h-52 overflow-y-auto">
          <div className="absolute top-0 right-0 p-5 opacity-5 text-rose-500 transform scale-[2]"><IconSparkles /></div>
          <div className="flex items-center gap-2 mb-3 border-b border-rose-100 pb-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-rose-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-black text-xs">AI</span>
            </div>
            <h4 className="text-rose-800 font-bold text-sm">Tiểu Nguyên Feedback</h4>
          </div>
          <div className="text-gray-800 text-sm leading-relaxed font-medium">{formatAIResponse(speakFeedback)}</div>
          <div className="mt-4 pt-3 flex justify-between items-center border-t border-rose-100">
            <button onClick={() => { const match = speakFeedback.match(/\*\*(.*?)\*\*/); if (match?.[1]) playAudio(match[1]); }} className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-full text-xs font-bold flex items-center gap-1.5 transition">
              <IconPlay /> Nghe AI đọc mẫu
            </button>
            <button onClick={() => setSpeakFeedback(null)} className="px-3 py-1.5 text-gray-500 hover:text-gray-800 font-semibold text-xs">Đóng</button>
          </div>
        </div>
      )}
    </div>
    );
  };

  // ── Render: Write ──
  const renderWrite = () => {
    if (!writingData[writeIdx]) return <div className="flex items-center justify-center h-full text-gray-400 text-sm">Đang tải tình huống...</div>;
    return (
    <div className="animate-fade-in flex flex-col h-full w-full max-w-4xl mx-auto py-2">
      <div className="flex justify-between items-center mb-2 shrink-0">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <div className="p-1 bg-emerald-100 text-emerald-600 rounded-lg"><IconWrite /></div> Viết Email
        </h2>
        <div className="flex gap-2">
          <button onClick={handleGenerateWritingScenario} disabled={isGeneratingNew} className="text-xs font-semibold text-emerald-600 hover:text-emerald-900 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 transition shadow-sm flex items-center gap-1">
            {isGeneratingNew ? <IconLoading /> : <IconSparkles />} Tạo Bằng AI
          </button>
          <button onClick={() => { setWriteIdx((prev) => (prev + 1) % writingData.length); setWriteInput(''); setWriteFeedback(null); }} className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 bg-white rounded-lg border border-gray-200 transition shadow-sm">
            Đổi Tình Huống
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-2 shrink-0">
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
          <h3 className="text-sm font-bold text-gray-900 mb-1.5">{writingData[writeIdx].title}</h3>
          <p className="text-gray-700 text-xs mb-2 leading-relaxed"><strong className="text-gray-900">Bối cảnh:</strong> {writingData[writeIdx].context}</p>
          <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 p-2 rounded-xl"><strong className="text-emerald-700 block mb-0.5">Nhiệm vụ:</strong> {writingData[writeIdx].task}</p>
        </div>
        <div className="md:col-span-2 hidden md:block h-full">
          {renderVisual(writingData[writeIdx].visualType)}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden min-h-0">
        <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">✍️ Khung soạn thảo</span>
        </div>
        <textarea
          value={writeInput} onChange={(e) => setWriteInput(e.target.value)}
          disabled={isGrading}
          className="flex-1 w-full bg-transparent p-3 text-gray-900 text-sm resize-none outline-none"
          placeholder="Gõ bản nháp tiếng Anh của anh vào đây..."
        />
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex flex-row justify-between items-center gap-4 shrink-0">
          <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border border-gray-200">{writeInput.length} chars</span>
          <button onClick={handleGradeWriting} disabled={isGrading} className={`text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm shadow-md flex items-center gap-1.5 ${isGrading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'}`}>
            {isGrading ? <IconLoading /> : <IconSparkles />}
            {isGrading ? "Đang đọc..." : "Gửi AI Chấm"}
          </button>
        </div>
      </div>

      {writeFeedback && (
        <div className="mt-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-lg text-gray-300 animate-fade-in relative overflow-hidden shrink-0 max-h-52 overflow-y-auto">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-500 transform scale-[2]"><IconSparkles /></div>
          <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 text-sm border-b border-gray-700 pb-3">
            <IconSparkles /> Tiểu Nguyên Feedback
          </h4>
          <div className="text-gray-300 text-sm leading-relaxed font-medium">{formatAIResponse(writeFeedback)}</div>
          <div className="mt-4 border-t border-gray-700 pt-3 flex justify-between items-center">
            <button onClick={() => { const match = writeFeedback.match(/\*\*(.*?)\*\*/); if (match?.[1]) playAudio(match[1]); }} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold flex items-center gap-1.5 transition text-xs">
              <IconPlay /> Nghe giọng đọc
            </button>
            <button onClick={() => setWriteFeedback(null)} className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition text-xs">Đóng</button>
          </div>
        </div>
      )}
    </div>
    );
  };

  const NavItem = ({ module, icon, label, activeColorClass }) => {
    const isActive = activeModule === module;
    return (
      <button
        onClick={() => { setActiveModule(module); showToast(`Đã chọn: ${label}`); }}
        className={`relative group flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isActive ? activeColorClass + ' shadow-md' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
      >
        {icon}
        <span className="text-[9px] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">{label}</span>
      </button>
    );
  };

  return (
    <div className="h-screen w-full bg-[#f8f9fa] text-gray-800 font-sans flex overflow-hidden selection:bg-blue-200 selection:text-blue-900">

      <aside className="w-20 md:w-24 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-3 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0">
        <div className="mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-3 rounded-2xl shadow-md shadow-blue-500/20 flex items-center justify-center">
            <IconZap />
          </div>
        </div>
        <div className="w-8 h-px bg-gray-100 mb-2"></div>
        <NavItem module="vocab" icon={<IconVocab />} label="Từ Vựng" activeColorClass="bg-blue-100 text-blue-600" />
        <NavItem module="listen" icon={<IconListen />} label="Nghe" activeColorClass="bg-amber-100 text-amber-600" />
        <NavItem module="read" icon={<IconRead />} label="Đọc" activeColorClass="bg-indigo-100 text-indigo-600" />
        <NavItem module="speak" icon={<IconSpeak />} label="Nói" activeColorClass="bg-rose-100 text-rose-600" />
        <NavItem module="write" icon={<IconWrite />} label="Viết" activeColorClass="bg-emerald-100 text-emerald-600" />
        <div className="flex-1"></div>
        <div className="w-8 h-px bg-gray-100 mb-2"></div>
        <button onClick={handleRandomModule} className="relative group flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 text-purple-500 hover:bg-purple-50">
          <IconRandom />
          <span className="text-[9px] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">Ngẫu Hứng</span>
        </button>
      </aside>

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="h-10 flex items-center justify-between px-4 border-b border-gray-100 bg-white/80 backdrop-blur-md shrink-0 z-10">
          <h1 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 tracking-tight hidden sm:block">FINTECH REFLEX</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-500 rounded-full border border-gray-200">
              {activeModule === 'vocab' && `Từ Vựng Doanh Nghiệp (${allVocab.length} từ)`}
              {activeModule === 'listen' && 'Luyện Nghe'}
              {activeModule === 'read' && 'Đọc Hiểu Tình Huống'}
              {activeModule === 'speak' && 'Giao Tiếp Voice AI'}
              {activeModule === 'write' && 'Soạn Email Thực Chiến'}
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-hidden">
          {activeModule === 'vocab' && renderVocab()}
          {activeModule === 'listen' && renderListen()}
          {activeModule === 'read' && renderRead()}
          {activeModule === 'speak' && renderSpeak()}
          {activeModule === 'write' && renderWrite()}
        </div>
      </main>

      {/* Add Vocab Modal */}
      {showAddVocab && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Thêm Từ Vựng Mới</h3>
              <button onClick={() => { setShowAddVocab(false); setAddVocabText(''); setParsedPreview(null); }} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition">
                <IconClose />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3 overflow-y-auto flex-1">
              {injectProgress ? (
                <div className="animate-fade-in flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Kết quả cập nhật:</p>
                  {Object.values(injectProgress).filter(Boolean).map((line, i) => (
                    <div key={i} className={`text-xs font-medium px-3 py-2 rounded-lg ${line.startsWith('✅') ? 'bg-green-50 text-green-700' : line.startsWith('❌') ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'}`}>{line}</div>
                  ))}
                  {Object.values(injectProgress).every(v => !v || !v.startsWith('⏳')) && (
                    <button
                      onClick={() => { setShowAddVocab(false); setInjectProgress(null); }}
                      className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
                    >
                      Đóng & Xem kết quả trong từng kỹ năng
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Dán nội dung từ vựng (hỗ trợ nhiều format có IPA /.../):</p>
                    <textarea
                      value={addVocabText}
                      onChange={(e) => { setAddVocabText(e.target.value); setParsedPreview(null); }}
                      className="w-full min-h-[80px] bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-800 resize-none outline-none focus:ring-2 focus:ring-blue-400 font-mono"
                      placeholder={"Procurement /prəˈkjʊə.mənt/ (n) - Sự thu mua\nVí dụ: The IT procurement process takes two weeks.\n\n16Persuade/pəˈsweɪd/Thuyết phụcPersuade customers..."}
                    />
                  </div>

                  <button onClick={handleParseVocab} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-md">
                    Phân tích & Xem trước
                  </button>

                  {parsedPreview !== null && (
                    <div className="animate-fade-in">
                      {parsedPreview.length === 0 ? (
                        <p className="text-center text-red-500 text-sm font-medium py-3">Không parse được từ nào. Kiểm tra format có đúng không ạ?</p>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Xem trước ({parsedPreview.length} từ):</p>
                          <div className="border border-gray-200 rounded-xl overflow-hidden max-h-44 overflow-y-auto">
                            {parsedPreview.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 p-2.5 border-b border-gray-100 last:border-0 text-sm">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                                <div>
                                  <span className="font-bold text-gray-900">{item.word}</span>
                                  <span className="text-blue-500 font-mono text-xs ml-1.5">{item.ipa}</span>
                                  <span className="text-gray-500 ml-1.5">— {item.vi}</span>
                                  {item.ex && <p className="text-gray-400 text-xs italic mt-0.5">"{item.ex}"</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                          <button onClick={handleConfirmAddVocab} className="w-full mt-2 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition shadow-md">
                            Xác nhận thêm {parsedPreview.length} từ → tất cả kỹ năng
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl z-50 animate-fade-in flex items-center gap-2 border border-gray-700">
          <IconCheck /> {toastMsg}
        </div>
      )}
    </div>
  );
}
