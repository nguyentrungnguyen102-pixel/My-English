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
  { cat: "Tài chính", word: "Reconciliation", ipa: "/ˌrek.ənˌsɪl.iˈeɪ.ʃən/", vi: "Sự đối soát", ex: "Automated reconciliation saves time.", hint: "Gợi ý: Quá trình kế toán dò lại 2 sổ sách xem dòng tiền có khớp nhau không." },
  { cat: "Tài chính", word: "Leverage", ipa: "/ˈlev.ər.ɪdʒ/", vi: "Đòn bẩy tài chính", ex: "Use leverage wisely to maximize returns.", hint: "Gợi ý: Dùng vốn vay để khuếch đại lợi nhuận — lợi khi thị trường tốt, rủi ro cao khi thị trường xấu." },
  { cat: "Tài chính", word: "Collateral", ipa: "/kəˈlæt.ər.əl/", vi: "Tài sản thế chấp", ex: "The loan requires collateral of $500,000.", hint: "Gợi ý: Tài sản anh đặt cọc khi vay — nếu không trả được nợ thì mất tài sản đó." },
  { cat: "Tài chính", word: "Volatility", ipa: "/ˌvɒl.əˈtɪl.ɪ.ti/", vi: "Tính biến động", ex: "Market volatility increased after the announcement.", hint: "Gợi ý: Chỉ mức độ giá dao động mạnh — thị trường crypto có volatility rất cao." },
  { cat: "Thanh toán", word: "Chargeback", ipa: "/ˈtʃɑːdʒ.bæk/", vi: "Hoàn tiền tranh chấp", ex: "The chargeback rate exceeded 1% this month.", hint: "Gợi ý: Khi khách hàng khiếu nại với ngân hàng để lấy lại tiền — nỗi ám ảnh của mọi merchant." },
  { cat: "Thanh toán", word: "Settlement", ipa: "/ˈset.əl.mənt/", vi: "Quyết toán", ex: "The settlement cycle takes two business days.", hint: "Gợi ý: Quá trình tiền thực sự được chuyển sau khi giao dịch được approved." },
  { cat: "Vận hành", word: "Throughput", ipa: "/ˈθruː.pʊt/", vi: "Công suất xử lý", ex: "The system's throughput is 10,000 TPS.", hint: "Gợi ý: Số lượng giao dịch/công việc hoàn thành trong một đơn vị thời gian." },
  { cat: "Chiến lược", word: "Scalable", ipa: "/ˈskeɪ.lə.bəl/", vi: "Có thể mở rộng quy mô", ex: "We need a scalable architecture for growth.", hint: "Gợi ý: Hệ thống có thể phục vụ 1000 hay 10 triệu user mà không cần thiết kế lại." },
  { cat: "Chiến lược", word: "Stakeholder", ipa: "/ˈsteɪk.həʊl.dər/", vi: "Bên liên quan", ex: "All stakeholders must approve the roadmap.", hint: "Gợi ý: Bất kỳ ai bị ảnh hưởng bởi dự án — từ CEO đến đối tác, nhân viên, nhà đầu tư." },
  { cat: "Chiến lược", word: "Milestone", ipa: "/ˈmaɪl.stəʊn/", vi: "Mốc quan trọng", ex: "Reaching 1 million users is a key milestone.", hint: "Gợi ý: Mốc đánh dấu tiến độ quan trọng trong dự án, thường gắn với deadline hoặc KPI." },
  { cat: "Vận hành", word: "Onboarding", ipa: "/ˈɒn.bɔːr.dɪŋ/", vi: "Tiếp nhận/Khởi động", ex: "The merchant onboarding process takes 3 days.", hint: "Gợi ý: Quá trình đưa merchant hoặc nhân viên mới vào hệ thống/công ty." },
  { cat: "Vận hành", word: "Procurement", ipa: "/prəˈkjʊər.mənt/", vi: "Thu mua", ex: "The IT procurement process takes two weeks.", hint: "Gợi ý: Toàn bộ quy trình mua sắm chính thức của doanh nghiệp — từ RFP đến ký hợp đồng." },
  { cat: "Kỹ thuật", word: "Deployment", ipa: "/dɪˈplɔɪ.mənt/", vi: "Triển khai", ex: "The deployment was rolled back due to a bug.", hint: "Gợi ý: Đưa code mới lên môi trường production — deploy xong mà app lỗi thì rollback." },
  { cat: "Pháp lý", word: "Mandate", ipa: "/ˈmæn.deɪt/", vi: "Ủy quyền/Nhiệm vụ bắt buộc", ex: "The new regulation mandates KYC verification.", hint: "Gợi ý: Quy định/lệnh bắt buộc phải thực hiện, thường từ cơ quan nhà nước hoặc cấp trên." },
  { cat: "Tài chính", word: "Liquidity", ipa: "/lɪˈkwɪd.ɪ.ti/", vi: "Tính thanh khoản", ex: "The startup struggled with liquidity issues.", hint: "Gợi ý: Khả năng chuyển tài sản thành tiền mặt nhanh chóng — tiền mặt có liquidity cao nhất." },
  { cat: "Thị trường", word: "Benchmark", ipa: "/ˈbentʃ.mɑːk/", vi: "Chuẩn so sánh", ex: "Our NPS score exceeds the industry benchmark.", hint: "Gợi ý: Tiêu chuẩn/mức tham chiếu để so sánh hiệu suất — như VN-Index là benchmark cho chứng khoán VN." },
  { cat: "Chiến lược", word: "Iterate", ipa: "/ˈɪt.ər.eɪt/", vi: "Cải tiến liên tục", ex: "We iterate the product based on user feedback.", hint: "Gợi ý: Liên tục cải thiện sản phẩm qua nhiều vòng lặp — phương pháp Agile dựa trên nguyên lý này." },
  { cat: "Tài chính", word: "Arbitrage", ipa: "/ˈɑː.bɪ.trɑːʒ/", vi: "Kinh doanh chênh lệch giá", ex: "Traders exploit arbitrage opportunities between exchanges.", hint: "Gợi ý: Mua rẻ ở nơi này, bán đắt ở nơi khác cùng lúc — khai thác chênh lệch giá không rủi ro." },
  { cat: "Pháp lý", word: "Due Diligence", ipa: "/ˌdjuː ˈdɪl.ɪ.dʒəns/", vi: "Thẩm định kỹ lưỡng", ex: "Investors conduct due diligence before funding.", hint: "Gợi ý: Điều tra toàn diện trước khi đầu tư/M&A — kiểm tra tài chính, pháp lý, vận hành." },
  { cat: "Chiến lược", word: "Traction", ipa: "/ˈtræk.ʃən/", vi: "Đà tăng trưởng", ex: "The startup showed strong traction with 50k users.", hint: "Gợi ý: Bằng chứng thực tế cho thấy sản phẩm đang được thị trường chấp nhận — số liệu, user, revenue." },
  { cat: "Chiến lược", word: "Momentum", ipa: "/məˈmen.təm/", vi: "Đà phát triển", ex: "The product gained momentum after the viral campaign.", hint: "Gợi ý: Giống như quả bóng lăn — một khi đã có momentum thì rất khó dừng lại." },
  { cat: "Tài chính", word: "Portfolio", ipa: "/pɔːtˈfəʊ.li.əʊ/", vi: "Danh mục đầu tư", ex: "The VC firm manages a diverse fintech portfolio.", hint: "Gợi ý: Tập hợp tất cả các khoản đầu tư hoặc sản phẩm — không bỏ hết trứng vào một giỏ." },
  { cat: "Tài chính", word: "Escrow", ipa: "/ˈes.krəʊ/", vi: "Tài khoản ký quỹ", ex: "Funds are held in escrow until both parties fulfill the contract.", hint: "Gợi ý: Tiền được giữ bởi bên thứ 3 trung lập cho đến khi điều kiện hợp đồng được thỏa mãn." },
  { cat: "Tài chính", word: "Amortize", ipa: "/ˈæm.ə.taɪz/", vi: "Khấu hao dần", ex: "The company amortizes its software development costs over five years.", hint: "Gợi ý: Phân bổ chi phí lớn ra nhiều kỳ kế toán thay vì ghi nhận một lần." },
  { cat: "Tài chính", word: "Accrue", ipa: "/əˈkruː/", vi: "Tích lũy (lãi/nợ)", ex: "Interest accrues daily on the outstanding loan balance.", hint: "Gợi ý: Lãi hoặc nợ tự động tăng lên theo thời gian dù chưa thanh toán." },
  { cat: "Tài chính", word: "Underwrite", ipa: "/ˈʌn.də.raɪt/", vi: "Bảo lãnh phát hành", ex: "The bank agreed to underwrite the $50M bond issuance.", hint: "Gợi ý: Cam kết mua toàn bộ cổ phiếu/trái phiếu nếu không ai mua — chịu rủi ro thay cho công ty." },
  { cat: "Tài chính", word: "Dilution", ipa: "/daɪˈluː.ʃən/", vi: "Pha loãng cổ phần", ex: "Issuing new shares caused significant dilution for early investors.", hint: "Gợi ý: Khi phát hành thêm cổ phiếu, phần trăm sở hữu của cổ đông cũ bị giảm xuống." },
  { cat: "Chiến lược", word: "Burn Rate", ipa: "/bɜːn reɪt/", vi: "Tốc độ đốt tiền", ex: "With a $200K monthly burn rate, the startup has 10 months of runway.", hint: "Gợi ý: Số tiền startup tiêu hàng tháng trước khi có lợi nhuận — burn rate cao thì runway ngắn." },
  { cat: "Chiến lược", word: "Runway", ipa: "/ˈrʌn.weɪ/", vi: "Thời gian tồn tại còn lại", ex: "After the funding round, they have 18 months of runway.", hint: "Gợi ý: Số tháng công ty còn tiền để hoạt động — như đường băng cho máy bay cất cánh." },
  { cat: "Chiến lược", word: "Pivot", ipa: "/ˈpɪv.ət/", vi: "Chuyển hướng chiến lược", ex: "After poor market feedback, they pivoted from B2C to B2B.", hint: "Gợi ý: Thay đổi căn bản hướng đi của sản phẩm/mô hình kinh doanh khi model cũ không hiệu quả." },
  { cat: "Chiến lược", word: "MVP", ipa: "/ˌem.viːˈpiː/", vi: "Sản phẩm khả dụng tối thiểu", ex: "The team launched an MVP in two weeks to validate the market.", hint: "Gợi ý: Minimum Viable Product — phiên bản đơn giản nhất đủ để kiểm nghiệm ý tưởng với người dùng thực." },
  { cat: "Thị trường", word: "Churn", ipa: "/tʃɜːn/", vi: "Tỷ lệ rời bỏ dịch vụ", ex: "High churn is a warning sign that product-market fit is weak.", hint: "Gợi ý: Tỷ lệ khách hàng ngừng sử dụng dịch vụ — churn cao nghĩa là giữ chân khách kém." },
  { cat: "Thị trường", word: "Retention", ipa: "/rɪˈten.ʃən/", vi: "Tỷ lệ giữ chân khách hàng", ex: "A 90-day retention rate of 60% is strong for a fintech app.", hint: "Gợi ý: Ngược lại với churn — đo xem bao nhiêu % người dùng tiếp tục dùng sản phẩm sau một khoảng thời gian." },
  { cat: "Marketing", word: "Conversion Rate", ipa: "/kənˈvɜː.ʃən reɪt/", vi: "Tỷ lệ chuyển đổi", ex: "Improving the checkout UX increased our conversion rate by 15%.", hint: "Gợi ý: Tỷ lệ người dùng thực hiện hành động mong muốn (mua hàng, đăng ký...) trên tổng số người truy cập." },
  { cat: "Marketing", word: "Funnel", ipa: "/ˈfʌn.əl/", vi: "Phễu chuyển đổi", ex: "Analyze each stage of the sales funnel to identify drop-off points.", hint: "Gợi ý: Hành trình từ khách lạ đến khách mua hàng — như cái phễu, càng xuống dưới càng ít người." },
  { cat: "Pháp lý", word: "KYC", ipa: "/ˌkeɪ.waɪˈsiː/", vi: "Xác thực danh tính khách hàng", ex: "All users must pass KYC before making their first transaction.", hint: "Gợi ý: Know Your Customer — quy trình bắt buộc trong fintech để xác minh danh tính, chống rửa tiền." },
  { cat: "Pháp lý", word: "AML", ipa: "/ˌeɪ.emˈel/", vi: "Chống rửa tiền", ex: "Our AML system flags suspicious transactions above $10,000.", hint: "Gợi ý: Anti-Money Laundering — hệ thống phát hiện và ngăn chặn các giao dịch rửa tiền bất hợp pháp." },
  { cat: "Kỹ thuật", word: "API", ipa: "/ˌeɪ.piːˈaɪ/", vi: "Giao diện lập trình ứng dụng", ex: "We expose a REST API so partners can integrate our payment gateway.", hint: "Gợi ý: Application Programming Interface — 'hợp đồng' kỹ thuật cho phép 2 hệ thống giao tiếp với nhau." },
  { cat: "Kỹ thuật", word: "Latency", ipa: "/ˈleɪ.tən.si/", vi: "Độ trễ", ex: "Payment latency must stay below 200ms for a smooth user experience.", hint: "Gợi ý: Thời gian từ lúc gửi yêu cầu đến lúc nhận phản hồi — latency thấp = hệ thống nhanh." },
  { cat: "Kỹ thuật", word: "Uptime", ipa: "/ˈʌp.taɪm/", vi: "Thời gian hoạt động", ex: "Our SLA guarantees 99.9% uptime for the payment processing service.", hint: "Gợi ý: Phần trăm thời gian hệ thống hoạt động bình thường — 99.9% uptime = chỉ ~8.7 giờ downtime/năm." },
  { cat: "Kỹ thuật", word: "Sandbox", ipa: "/ˈsænd.bɒks/", vi: "Môi trường thử nghiệm", ex: "Test your API integration in the sandbox before going live.", hint: "Gợi ý: Môi trường giả lập an toàn để dev test mà không ảnh hưởng hệ thống thực." },
  { cat: "Kỹ thuật", word: "Rollback", ipa: "/ˈrəʊl.bæk/", vi: "Hoàn tác triển khai", ex: "The team triggered a rollback after the new release caused errors.", hint: "Gợi ý: Quay lại phiên bản trước khi có lỗi nghiêm trọng sau khi deploy — bước cứu cánh cuối cùng." },
  { cat: "Vận hành", word: "SLA", ipa: "/ˌes.elˈeɪ/", vi: "Thỏa thuận mức dịch vụ", ex: "Breaching the SLA triggers a penalty clause in the contract.", hint: "Gợi ý: Service Level Agreement — hợp đồng cam kết chất lượng dịch vụ (uptime, response time...)." },
  { cat: "Vận hành", word: "KPI", ipa: "/ˌkeɪ.piːˈaɪ/", vi: "Chỉ số hiệu suất then chốt", ex: "Monthly active users is our primary KPI for the consumer app.", hint: "Gợi ý: Key Performance Indicator — thước đo cụ thể để biết team/sản phẩm có đang đi đúng hướng không." },
  { cat: "Chiến lược", word: "OKR", ipa: "/ˌəʊ.keɪˈɑːr/", vi: "Mục tiêu và kết quả then chốt", ex: "Each team sets OKRs at the start of every quarter.", hint: "Gợi ý: Objectives and Key Results — khung quản lý mục tiêu của Google/Intel: 1 mục tiêu lớn + 3-5 kết quả đo được." },
  { cat: "Chiến lược", word: "Roadmap", ipa: "/ˈrəʊd.mæp/", vi: "Lộ trình sản phẩm", ex: "The Q3 roadmap prioritizes compliance features over new integrations.", hint: "Gợi ý: Kế hoạch tổng thể theo thời gian cho sản phẩm/dự án — cho thấy sẽ làm gì, khi nào." },
  { cat: "Chiến lược", word: "Agile", ipa: "/ˈædʒ.aɪl/", vi: "Linh hoạt/Phương pháp Agile", ex: "We use Agile sprints to ship new features every two weeks.", hint: "Gợi ý: Phương pháp phát triển phần mềm chia công việc thành các sprint ngắn, liên tục cải tiến." },
  { cat: "Kỹ thuật", word: "Tokenization", ipa: "/ˌtəʊ.kən.aɪˈzeɪ.ʃən/", vi: "Mã hóa dữ liệu thẻ", ex: "Tokenization replaces card numbers with secure tokens during transactions.", hint: "Gợi ý: Thay thế thông tin thẻ thật bằng mã token vô nghĩa — nếu bị hack cũng không lấy được số thẻ thật." },
  { cat: "Kỹ thuật", word: "Encryption", ipa: "/ɪnˈkrɪp.ʃən/", vi: "Mã hóa dữ liệu", ex: "All data in transit is protected by end-to-end encryption.", hint: "Gợi ý: Biến dữ liệu thành mật mã không đọc được nếu không có chìa khóa — bảo mật thông tin tuyệt đối." },
  { cat: "Thanh toán", word: "Fraud Detection", ipa: "/frɔːd dɪˈtek.ʃən/", vi: "Phát hiện gian lận", ex: "Our AI-powered fraud detection blocks 99.5% of suspicious transactions.", hint: "Gợi ý: Hệ thống tự động nhận diện và chặn các giao dịch bất thường — xương sống của mọi platform thanh toán." },
  { cat: "Đàm phán", word: "Partnership", ipa: "/ˈpɑːt.nə.ʃɪp/", vi: "Quan hệ đối tác", ex: "We signed a strategic partnership with three major Vietnamese banks.", hint: "Gợi ý: Quan hệ hợp tác chính thức giữa hai tổ chức — khác với vendor là có lợi ích chia sẻ 2 chiều." },
  { cat: "Tài chính", word: "Hedge", ipa: "/hedʒ/", vi: "Phòng ngừa rủi ro", ex: "The company uses currency forwards to hedge against exchange rate fluctuations.", hint: "Gợi ý: Dùng công cụ tài chính (futures, options...) để giảm thiểu rủi ro biến động giá — như mua bảo hiểm cho danh mục đầu tư." },
  { cat: "Tài chính", word: "Perpetual", ipa: "/pəˈpetʃ.u.əl/", vi: "Vĩnh viễn/Không kỳ hạn", ex: "They issued perpetual bonds to raise long-term capital without a maturity date.", hint: "Gợi ý: Không có ngày đáo hạn — trái phiếu perpetual trả lãi mãi mãi nhưng không hoàn vốn gốc." },
  { cat: "Chiến lược", word: "Bootstrapped", ipa: "/ˈbuːt.stræpt/", vi: "Tự lực khởi nghiệp", ex: "The founders bootstrapped the company for two years before seeking external funding.", hint: "Gợi ý: Tự bỏ tiền túi ra xây dựng startup mà không cần vốn bên ngoài — kiểm soát hoàn toàn nhưng rủi ro cao." },
  { cat: "Chiến lược", word: "Cap Table", ipa: "/kæp ˈteɪ.bəl/", vi: "Bảng phân bổ cổ phần", ex: "The investors reviewed the cap table before signing the term sheet.", hint: "Gợi ý: Bảng ghi ai sở hữu bao nhiêu % công ty — nhà đầu tư Series A thường nhìn vào đây trước tiên." },
  { cat: "Kỹ thuật", word: "Fallback", ipa: "/ˈfɔːl.bæk/", vi: "Phương án dự phòng", ex: "The payment system has a fallback to manual processing if the API fails.", hint: "Gợi ý: Kế hoạch B khi hệ thống chính gặp sự cố — critical cho mọi fintech platform." },
  { cat: "Kỹ thuật", word: "Circuit Breaker", ipa: "/ˈsɜː.kɪt ˌbreɪ.kər/", vi: "Cầu dao ngắt mạch", ex: "The circuit breaker pattern prevents cascading failures across microservices.", hint: "Gợi ý: Khi một service bị lỗi, circuit breaker ngắt kết nối để tránh lỗi lan rộng toàn hệ thống." },
  { cat: "Kỹ thuật", word: "Microservice", ipa: "/ˈmaɪ.krəʊˌsɜː.vɪs/", vi: "Kiến trúc vi dịch vụ", ex: "We decomposed the monolith into microservices to improve scalability and deployment speed.", hint: "Gợi ý: Chia ứng dụng lớn thành nhiều service nhỏ độc lập — mỗi team quản lý 1 service, deploy nhanh hơn." },
  { cat: "Kỹ thuật", word: "Incident", ipa: "/ˈɪn.sɪ.dənt/", vi: "Sự cố hệ thống", ex: "The on-call engineer resolved the P1 incident within 15 minutes, meeting the SLA.", hint: "Gợi ý: Sự cố làm gián đoạn dịch vụ — P1 là nghiêm trọng nhất, cần xử lý ngay lập tức." },
  { cat: "Kỹ thuật", word: "Go-live", ipa: "/ˌɡəʊ ˈlaɪv/", vi: "Chính thức ra mắt", ex: "The go-live date for the new payment module is scheduled for next Monday.", hint: "Gợi ý: Thời điểm hệ thống/tính năng mới được đưa vào production và phục vụ người dùng thực." },
  { cat: "Chiến lược", word: "Backlog", ipa: "/ˈbæk.lɒɡ/", vi: "Danh sách tồn đọng công việc", ex: "The product manager prioritized the backlog before the sprint planning session.", hint: "Gợi ý: Danh sách tất cả các tính năng/bug cần làm, được sắp xếp theo độ ưu tiên — xương sống của Agile." },
  { cat: "Chiến lược", word: "Sprint", ipa: "/sprɪnt/", vi: "Chu kỳ phát triển ngắn", ex: "Each sprint lasts two weeks and results in a shippable product increment.", hint: "Gợi ý: Khoảng thời gian cố định (thường 1-2 tuần) để team hoàn thành một lượng công việc đã cam kết." },
  { cat: "Vận hành", word: "Vendor", ipa: "/ˈven.dər/", vi: "Nhà cung cấp", ex: "We evaluated three vendors before selecting the cloud infrastructure provider.", hint: "Gợi ý: Bên bán hàng/dịch vụ cho doanh nghiệp — không có lợi ích chung như partner, chỉ là quan hệ mua bán." },
  { cat: "Đàm phán", word: "Negotiation", ipa: "/nɪˌɡəʊ.ʃiˈeɪ.ʃən/", vi: "Đàm phán", ex: "Successful fee negotiation with the card network saved us $2M annually.", hint: "Gợi ý: Quá trình thương lượng để đạt thỏa thuận có lợi — BATNA là khái niệm quan trọng trong negotiation." },
  { cat: "Kỹ thuật", word: "Integration", ipa: "/ˌɪn.tɪˈɡreɪ.ʃən/", vi: "Tích hợp hệ thống", ex: "The bank API integration took three months and required extensive testing in sandbox.", hint: "Gợi ý: Kết nối hai hệ thống để chúng hoạt động cùng nhau — REST API hay webhook là cách phổ biến nhất." },
  { cat: "Thanh toán", word: "Risk Score", ipa: "/rɪsk skɔːr/", vi: "Điểm rủi ro", ex: "Each transaction is assigned a risk score to determine if it requires additional verification.", hint: "Gợi ý: Điểm số tự động tính toán mức độ nguy hiểm của giao dịch — score cao = cần xem xét thêm." },
  { cat: "Pháp lý", word: "Whitelist", ipa: "/ˈwaɪt.lɪst/", vi: "Danh sách trắng (được phép)", ex: "Only whitelisted IP addresses can access the admin payment dashboard.", hint: "Gợi ý: Danh sách những gì được phép (người dùng, IP, merchant...) — ngược lại với blacklist." },
  { cat: "Pháp lý", word: "Blacklist", ipa: "/ˈblæk.lɪst/", vi: "Danh sách đen (bị cấm)", ex: "The AML system automatically blacklists accounts linked to suspicious activity.", hint: "Gợi ý: Danh sách các thực thể bị cấm giao dịch — do gian lận, rửa tiền, hoặc vi phạm pháp luật." },
  { cat: "Tài chính", word: "Syndicate", ipa: "/ˈsɪn.dɪ.kət/", vi: "Tổ hợp đầu tư", ex: "A syndicate of five banks co-financed the infrastructure project.", hint: "Gợi ý: Nhóm các tổ chức tài chính cùng nhau tham gia vào một thương vụ lớn — chia sẻ rủi ro và lợi nhuận." },
  { cat: "Nhân sự", word: "Headcount", ipa: "/ˈhed.kaʊnt/", vi: "Số lượng nhân sự", ex: "The CFO approved a headcount increase of 20 engineers for the next fiscal year.", hint: "Gợi ý: Tổng số nhân viên trong một tổ chức hoặc bộ phận — HR thường quản lý headcount theo budget." },
  { cat: "Nhân sự", word: "Attrition", ipa: "/əˈtrɪʃ.ən/", vi: "Tỷ lệ nghỉ việc tự nhiên", ex: "High attrition in the engineering team is increasing recruitment and onboarding costs.", hint: "Gợi ý: Nhân viên rời công ty theo ý nguyện (khác với layoff) — attrition cao làm mất knowledge và tốn chi phí tuyển dụng." },
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
  { id: 21, en: "High market volatility makes it difficult to set accurate revenue forecasts for the next quarter.", vi: "Biến động thị trường cao khiến việc dự báo doanh thu chính xác cho quý tới trở nên khó khăn." },
  { id: 22, en: "We must use leverage wisely, ensuring our collateral covers at least twice the loan value.", vi: "Chúng ta phải dùng đòn bẩy một cách khôn ngoan, đảm bảo tài sản thế chấp bao phủ ít nhất gấp đôi giá trị khoản vay." },
  { id: 23, en: "The chargeback rate is approaching the Visa threshold, so we need to tighten fraud detection immediately.", vi: "Tỷ lệ hoàn tiền tranh chấp đang tiệm cận ngưỡng Visa, vì vậy chúng ta cần siết chặt phát hiện gian lận ngay lập tức." },
  { id: 24, en: "Our settlement cycle has been reduced from three days to same-day, improving merchant cash flow substantially.", vi: "Chu kỳ quyết toán của chúng ta đã được rút ngắn từ ba ngày xuống còn trong ngày, cải thiện đáng kể dòng tiền cho merchant." },
  { id: 25, en: "Scalable infrastructure is critical for fintech companies that expect rapid user growth.", vi: "Cơ sở hạ tầng có thể mở rộng rất quan trọng với các công ty fintech dự kiến tăng trưởng người dùng nhanh." },
  { id: 26, en: "All stakeholders must align on the product roadmap before we commit to the Q4 milestones.", vi: "Tất cả các bên liên quan phải đồng thuận về lộ trình sản phẩm trước khi chúng ta cam kết các mốc Q4." },
  { id: 27, en: "Procurement costs can be reduced significantly by consolidating vendors and renegotiating contracts annually.", vi: "Chi phí thu mua có thể giảm đáng kể bằng cách gộp nhà cung cấp và đàm phán lại hợp đồng hàng năm." },
  { id: 28, en: "The startup demonstrated strong traction with fifty thousand active users just three months after launch.", vi: "Startup cho thấy đà tăng trưởng mạnh với 50 nghìn người dùng tích cực chỉ ba tháng sau khi ra mắt." },
  { id: 29, en: "Arbitrage opportunities between payment networks allow merchants to reduce transaction fees by up to forty percent.", vi: "Cơ hội kinh doanh chênh lệch giá giữa các mạng thanh toán giúp merchant giảm phí giao dịch tới 40 phần trăm." },
  { id: 30, en: "Before closing the acquisition, the legal team conducted due diligence on all outstanding liabilities and compliance issues.", vi: "Trước khi hoàn tất thâu tóm, đội pháp lý đã thẩm định kỹ lưỡng tất cả các khoản nợ tồn đọng và vấn đề tuân thủ." },
  { id: 31, en: "The startup's monthly burn rate is two hundred thousand dollars, leaving only eight months of runway.", vi: "Tốc độ đốt tiền hàng tháng của startup là 200 nghìn đô la, chỉ còn tám tháng thời gian tồn tại." },
  { id: 32, en: "KYC verification must be completed before a user can initiate any cross-border transaction.", vi: "Xác thực KYC phải được hoàn thành trước khi người dùng có thể thực hiện bất kỳ giao dịch xuyên biên giới nào." },
  { id: 33, en: "The fraud detection algorithm flagged over three hundred suspicious transactions within a single hour.", vi: "Thuật toán phát hiện gian lận đã gắn cờ hơn 300 giao dịch đáng ngờ trong vòng một giờ." },
  { id: 34, en: "Tokenization ensures that actual card numbers are never stored on our servers, reducing PCI compliance scope.", vi: "Mã hóa token đảm bảo rằng số thẻ thực sự không bao giờ được lưu trữ trên máy chủ của chúng ta, thu hẹp phạm vi tuân thủ PCI." },
  { id: 35, en: "After the pivot from B2C to B2B, the company's churn rate dropped from fifteen percent to just three percent.", vi: "Sau khi chuyển hướng từ B2C sang B2B, tỷ lệ rời bỏ dịch vụ của công ty giảm từ 15% xuống chỉ còn 3%." },
  { id: 36, en: "The API latency must remain below two hundred milliseconds to maintain a smooth checkout experience.", vi: "Độ trễ API phải duy trì dưới 200 mili giây để đảm bảo trải nghiệm thanh toán mượt mà." },
  { id: 37, en: "Our AML system uses machine learning to detect patterns of money laundering across millions of daily transactions.", vi: "Hệ thống AML của chúng ta sử dụng học máy để phát hiện các mô hình rửa tiền qua hàng triệu giao dịch mỗi ngày." },
  { id: 38, en: "The product team ran three sprints to deliver the MVP before the investor demo at the end of the month.", vi: "Đội sản phẩm đã chạy ba sprint để ra mắt MVP trước buổi demo cho nhà đầu tư vào cuối tháng." },
  { id: 39, en: "A well-maintained cap table is essential for transparent communication with existing and potential investors.", vi: "Bảng phân bổ cổ phần được quản lý tốt là điều thiết yếu cho giao tiếp minh bạch với các nhà đầu tư hiện tại và tiềm năng." },
  { id: 40, en: "The vendor's SLA guarantees ninety-nine point nine percent uptime and a maximum response time of four hours for critical incidents.", vi: "SLA của nhà cung cấp đảm bảo uptime 99,9% và thời gian phản hồi tối đa bốn giờ cho các sự cố nghiêm trọng." },
  { id: 41, en: "Equity dilution from the Series B round reduced the founders' combined ownership from sixty to forty-two percent.", vi: "Pha loãng cổ phần từ vòng Series B đã giảm tổng quyền sở hữu của các nhà sáng lập từ 60 xuống còn 42 phần trăm." },
  { id: 42, en: "The engineering team implemented a circuit breaker pattern to prevent any single microservice failure from taking down the entire platform.", vi: "Đội kỹ thuật triển khai mô hình cầu dao ngắt mạch để ngăn bất kỳ lỗi microservice đơn lẻ nào làm sập toàn bộ nền tảng." },
  { id: 43, en: "Our conversion rate improved by twenty-two percent after we simplified the onboarding flow from seven steps to three.", vi: "Tỷ lệ chuyển đổi của chúng ta tăng 22% sau khi chúng ta đơn giản hóa quy trình onboarding từ bảy bước xuống còn ba bước." },
  { id: 44, en: "Funds held in escrow are released to the seller only after the buyer confirms satisfactory delivery of services.", vi: "Tiền giữ trong tài khoản ký quỹ chỉ được giải phóng cho người bán sau khi người mua xác nhận dịch vụ được giao thỏa đáng." },
  { id: 45, en: "The product roadmap for the next two quarters focuses on compliance automation and reducing manual reconciliation effort.", vi: "Lộ trình sản phẩm cho hai quý tới tập trung vào tự động hóa tuân thủ và giảm thiểu nỗ lực đối soát thủ công." },
  { id: 46, en: "Hedging currency risk through forward contracts helped us protect margins during the recent exchange rate volatility.", vi: "Phòng ngừa rủi ro tỷ giá thông qua hợp đồng kỳ hạn đã giúp chúng ta bảo vệ biên lợi nhuận trong đợt biến động tỷ giá vừa qua." },
  { id: 47, en: "The OKRs for this quarter are aligned with our strategic goal of achieving breakeven in the consumer lending product.", vi: "Các OKR trong quý này được căn chỉnh với mục tiêu chiến lược đạt điểm hòa vốn trong sản phẩm cho vay tiêu dùng." },
  { id: 48, en: "Integration with the national payment switch required six months of sandbox testing before the go-live date.", vi: "Tích hợp với hệ thống thanh toán quốc gia yêu cầu sáu tháng kiểm thử trong sandbox trước ngày chính thức ra mắt." },
  { id: 49, en: "High customer attrition in the first quarter prompted us to redesign the user retention strategy entirely.", vi: "Tỷ lệ rời bỏ khách hàng cao trong quý một đã thúc đẩy chúng ta thiết kế lại hoàn toàn chiến lược giữ chân người dùng." },
  { id: 50, en: "The bootstrapped startup reached profitability in eighteen months without raising a single dollar from external investors.", vi: "Startup tự lực đã đạt được lợi nhuận trong 18 tháng mà không cần huy động một đô la nào từ nhà đầu tư bên ngoài." },
];

const initialWritingData = [
  {
    title: "Merchant Discontent: Interchange Fee",
    context: "Đối tác chuỗi rạp chiếu phim phàn nàn phí giao dịch qua cổng của bên mình quá cao (3.5%). P&L nội bộ lại báo cáo 'discrepancy' ở dòng tiền đối soát.",
    task: "Viết email từ chối giảm phí, dùng hệ thống đối soát tự động làm vũ khí giữ chân. Dùng các từ: discrepancy, reconciliation, compliance.",
    visualType: "invoice"
  },
  {
    title: "Revenue Deficit Notification",
    context: "Báo cáo Q3 ghi nhận khoản 'Substantial Deficit' (Thâm hụt) do 'Overhead costs' của team Vận hành vượt ngân sách 30%.",
    task: "Viết đoạn tóm tắt đề xuất cắt giảm chi phí hoặc tối ưu quy trình. Dùng: deficit, overhead, substantial, EBITDA.",
    visualType: "chartDown"
  },
  {
    title: "Chargeback Crisis Response",
    context: "Tỷ lệ chargeback tháng này tăng đột biến lên 2.3%, vượt ngưỡng cho phép của Visa/Mastercard (1%). Nếu không xử lý, bên mình có thể bị đình chỉ tư cách merchant.",
    task: "Viết email khẩn tới team Risk & Compliance trình bày kế hoạch xử lý trong 72 giờ. Dùng: chargeback, compliance, settlement, threshold.",
    visualType: "dashboardAlert"
  },
  {
    title: "Investor Due Diligence Request",
    context: "Quỹ đầu tư Series B yêu cầu tài liệu thẩm định (due diligence) trước khi rót vốn. Họ muốn hiểu rõ về scalability, liquidity runway và compliance roadmap.",
    task: "Viết email phản hồi xác nhận cung cấp đủ tài liệu, nêu rõ timeline. Dùng: due diligence, scalable, liquidity, milestone.",
    visualType: "invoice"
  },
  {
    title: "Procurement Policy Update",
    context: "Ban lãnh đạo yêu cầu cập nhật quy trình procurement để tất cả hợp đồng trên $10,000 phải qua 3 bước phê duyệt, nhằm kiểm soát overhead costs.",
    task: "Viết internal memo thông báo chính sách mới tới toàn bộ team. Dùng: procurement, overhead, stipulate, compliance, mandate.",
    visualType: "chartDown"
  },
  {
    title: "KYC Rejection Notice to Partner",
    context: "Một đối tác muốn onboard lên nền tảng nhưng tài liệu KYC họ nộp bị hệ thống AML từ chối vì thiếu giấy phép kinh doanh hợp lệ.",
    task: "Viết email lịch sự thông báo từ chối và hướng dẫn các bước cần bổ sung. Dùng: KYC, AML, compliance, onboarding, mandate.",
    visualType: "dashboardAlert"
  },
  {
    title: "API Latency Incident Post-Mortem",
    context: "Hệ thống thanh toán bị tăng đột biến latency lên 3 giây vào giờ cao điểm hôm qua, gây ra nhiều giao dịch thất bại và khách hàng phàn nàn.",
    task: "Viết báo cáo post-mortem gửi cho management. Nêu nguyên nhân, tác động và hành động khắc phục. Dùng: latency, incident, SLA, uptime, rollback.",
    visualType: "dashboardAlert"
  },
  {
    title: "Series B Cap Table Summary Email",
    context: "Nhà đầu tư lead trong vòng Series B yêu cầu bản tóm tắt cap table hiện tại trước khi ký term sheet, bao gồm thông tin về dilution cho founders.",
    task: "Viết email đính kèm cap table và giải thích tác động dilution. Dùng: cap table, dilution, Series B, equity, stakeholder.",
    visualType: "invoice"
  },
  {
    title: "Burn Rate Alert to Board of Directors",
    context: "Burn rate tháng này tăng 40% so với kế hoạch do chi phí nhân sự và cơ sở hạ tầng cloud tăng đột biến. Runway hiện tại chỉ còn 6 tháng.",
    task: "Viết email khẩn gửi Board of Directors trình bày tình hình và đề xuất ít nhất 2 phương án cắt giảm. Dùng: burn rate, runway, overhead, headcount, pivot.",
    visualType: "chartDown"
  },
  {
    title: "Fraud Detection System Upgrade Proposal",
    context: "Hệ thống phát hiện gian lận hiện tại có tỷ lệ false positive cao (15%), làm block nhầm nhiều giao dịch hợp lệ và gây khó chịu cho merchant.",
    task: "Viết đề xuất nâng cấp hệ thống lên mô hình ML mới, ước tính ROI. Dùng: fraud detection, risk score, false positive, AML, SLA.",
    visualType: "dashboardAlert"
  },
  {
    title: "Settlement Delay Explanation to Merchant",
    context: "Một merchant lớn phàn nàn rằng tiền từ giao dịch tuần trước vẫn chưa về tài khoản do hệ thống settlement đang trong quá trình nâng cấp.",
    task: "Viết email xin lỗi và giải thích timeline. Dùng: settlement, reconciliation, SLA, throughput, go-live.",
    visualType: "invoice"
  },
  {
    title: "Churn Analysis Report to Product Team",
    context: "Phân tích dữ liệu tháng qua cho thấy churn rate của phân khúc SME tăng lên 8%, cao hơn mức trung bình ngành (3%). Nguyên nhân chính là UX phức tạp.",
    task: "Viết báo cáo phân tích gửi Product team, đề xuất ưu tiên trong backlog. Dùng: churn, retention, conversion rate, funnel, MVP.",
    visualType: "chartDown"
  },
  {
    title: "Vendor Contract Renegotiation Email",
    context: "Hợp đồng với nhà cung cấp cloud sắp hết hạn. Anh cần đàm phán lại để giảm chi phí ít nhất 20% dựa trên mức sử dụng thực tế thấp hơn dự kiến.",
    task: "Viết email mở đầu cuộc đàm phán với vendor, đặt vấn đề và nêu điều kiện mong muốn. Dùng: vendor, negotiation, SLA, procurement, overhead.",
    visualType: "invoice"
  },
  {
    title: "AML Compliance Quarterly Report",
    context: "Cuối quý, team Compliance phải nộp báo cáo AML định kỳ cho Ngân hàng Nhà nước, bao gồm số lượng giao dịch bị flag và kết quả điều tra.",
    task: "Viết phần tóm tắt điều hành (executive summary) của báo cáo AML. Dùng: AML, KYC, blacklist, compliance, threshold.",
    visualType: "dashboardAlert"
  },
  {
    title: "Microservice Migration Roadmap Memo",
    context: "CTO quyết định chuyển đổi kiến trúc monolith hiện tại sang microservice trong 12 tháng để tăng scalability và giảm deployment risk.",
    task: "Viết internal memo thông báo kế hoạch migration cho toàn bộ engineering team. Dùng: microservice, deployment, rollback, circuit breaker, milestone.",
    visualType: "presentation"
  },
  {
    title: "Partnership Announcement to Merchants",
    context: "Công ty vừa ký kết partnership chiến lược với một ngân hàng lớn, cho phép merchant của mình tiếp cận hạn mức tín dụng ưu đãi thông qua nền tảng.",
    task: "Viết email thông báo partnership tới toàn bộ merchant network, nêu rõ lợi ích. Dùng: partnership, integration, collateral, liquidity, onboarding.",
    visualType: "videoCall"
  },
  {
    title: "OKR Review Email to Department Heads",
    context: "Cuối quý, CEO muốn các trưởng bộ phận báo cáo tiến độ OKR, xác định key result nào đạt, chưa đạt và lý do.",
    task: "Viết email yêu cầu báo cáo OKR từ các department head, kèm template cần điền. Dùng: OKR, KPI, milestone, roadmap, stakeholder.",
    visualType: "presentation"
  },
  {
    title: "Sandbox Environment Access Request",
    context: "Một partner fintech mới muốn được cấp quyền truy cập môi trường sandbox để thử nghiệm API tích hợp trước khi ký hợp đồng chính thức.",
    task: "Viết email hướng dẫn partner về quy trình đăng ký sandbox access và các bước integration test. Dùng: sandbox, API, integration, go-live, SLA.",
    visualType: "dashboardAlert"
  },
  {
    title: "Investor Update: Traction & Retention Metrics",
    context: "Tháng này là tháng gửi báo cáo định kỳ cho nhà đầu tư. Các chỉ số tháng này rất tốt: retention tăng 15%, conversion rate tăng 8%.",
    task: "Viết investor update email ngắn gọn, trình bày các chỉ số tăng trưởng. Dùng: traction, retention, conversion rate, churn, KPI.",
    visualType: "chartDown"
  },
  {
    title: "Escrow Account Setup Instructions",
    context: "Công ty chuẩn bị triển khai tính năng thanh toán escrow cho các giao dịch B2B lớn. Merchant cần được hướng dẫn cách thức hoạt động.",
    task: "Viết hướng dẫn sử dụng tính năng escrow gửi cho merchant. Dùng: escrow, settlement, compliance, threshold, reconciliation.",
    visualType: "invoice"
  },
  {
    title: "Risk Score Model Documentation",
    context: "Team Data Science vừa ra mắt mô hình risk score mới với độ chính xác 94%. Cần ghi lại tài liệu kỹ thuật và gửi cho team Compliance review.",
    task: "Viết tài liệu mô tả mô hình risk score: các yếu tố đầu vào, ngưỡng quyết định, và quy trình review. Dùng: risk score, fraud detection, AML, whitelist, threshold.",
    visualType: "dashboardAlert"
  },
  {
    title: "Agile Sprint Retrospective Summary",
    context: "Kết thúc sprint 12, team cần tổng kết những gì đã làm tốt, những vấn đề gặp phải và các cải tiến cho sprint tiếp theo.",
    task: "Viết email tổng kết sprint retrospective gửi cho team và product stakeholders. Dùng: sprint, backlog, agile, milestone, KPI.",
    visualType: "presentation"
  },
  {
    title: "Headcount Budget Request for Engineering",
    context: "Roadmap Q3 yêu cầu mở rộng đội engineering thêm 5 senior developer, nhưng HR cần COO phê duyệt ngân sách tuyển dụng bổ sung.",
    task: "Viết đề xuất ngân sách headcount gửi COO, nêu rõ ROI và timeline onboarding. Dùng: headcount, onboarding, roadmap, OKR, burn rate.",
    visualType: "presentation"
  },
  {
    title: "Tokenization Compliance Briefing",
    context: "Nhóm kiểm toán nội bộ yêu cầu giải trình về cách hệ thống tokenization đảm bảo tuân thủ tiêu chuẩn PCI DSS trong lưu trữ và xử lý dữ liệu thẻ.",
    task: "Viết briefing document giải thích cơ chế tokenization và encryption. Dùng: tokenization, encryption, compliance, sandbox, whitelist.",
    visualType: "invoice"
  },
  {
    title: "Perpetual Bond Issuance Announcement",
    context: "CFO quyết định phát hành trái phiếu không kỳ hạn (perpetual bond) trị giá $20M để huy động vốn dài hạn mà không pha loãng cổ phần.",
    task: "Viết thông báo nội bộ về quyết định phát hành trái phiếu, giải thích lợi ích so với equity financing. Dùng: perpetual, dilution, underwrite, collateral, portfolio.",
    visualType: "chartDown"
  },
  {
    title: "Pivot Decision Memo to All Staff",
    context: "Sau 6 tháng thử nghiệm, CEO quyết định pivot mô hình kinh doanh từ B2C lending sang B2B supply chain finance do tỷ lệ NPL (nợ xấu) quá cao.",
    task: "Viết memo toàn công ty thông báo quyết định pivot, giải thích lý do và hướng đi mới. Dùng: pivot, churn, runway, MVP, stakeholder.",
    visualType: "presentation"
  },
  {
    title: "Hedge Strategy Proposal for FX Risk",
    context: "Công ty có doanh thu bằng USD nhưng chi phí vận hành bằng VND. Sự biến động tỷ giá gần đây đã ăn mòn biên lợi nhuận 3%.",
    task: "Viết đề xuất chiến lược phòng ngừa rủi ro tỷ giá gửi CFO. Dùng: hedge, volatility, collateral, leverage, arbitrage.",
    visualType: "chartDown"
  },
  {
    title: "Go-live Checklist Communication",
    context: "Tính năng thanh toán qua QR code sắp được go-live vào tuần tới. Cần gửi checklist cuối cùng cho tất cả các team liên quan.",
    task: "Viết email checklist go-live, liệt kê các hạng mục cần xác nhận từ từng bộ phận. Dùng: go-live, SLA, uptime, rollback, fallback.",
    visualType: "dashboardAlert"
  },
  {
    title: "Bootstrapped Startup Acquisition Offer",
    context: "Công ty đang xem xét mua lại một startup bootstrapped trong lĩnh vực SME lending có 20k user và revenue $500K ARR, nhưng chưa gọi vốn bên ngoài.",
    task: "Viết letter of intent (LOI) sơ bộ đề xuất thâu tóm, nêu mức giá tham chiếu và điều kiện due diligence. Dùng: bootstrapped, acquisition, due diligence, traction, escrow.",
    visualType: "invoice"
  },
  {
    title: "Attrition Report and Retention Plan",
    context: "Tỷ lệ nghỉ việc trong engineering team đạt 25% trong năm nay, cao hơn gấp đôi mức trung bình ngành. CFO yêu cầu phân tích nguyên nhân và kế hoạch cải thiện.",
    task: "Viết báo cáo phân tích nguyên nhân attrition và đề xuất 3 giải pháp giữ chân nhân tài. Dùng: attrition, headcount, onboarding, OKR, burn rate.",
    visualType: "chartDown"
  },
  {
    title: "Amortization Schedule for Software Costs",
    context: "Team kế toán cần lập lịch khấu hao cho khoản đầu tư phát triển phần mềm $1.2M, được phân bổ đều trong 3 năm theo chuẩn kế toán IFRS.",
    task: "Viết email hướng dẫn cách ghi nhận chi phí amortization theo từng kỳ. Dùng: amortize, EBITDA, accrual, overhead, reconciliation.",
    visualType: "invoice"
  },
  {
    title: "Accrued Interest Notification to Borrowers",
    context: "Hệ thống lending tự động tính lãi tích lũy hàng ngày cho các khoản vay quá hạn. Cần gửi thông báo tự động cho borrower trước khi trừ tiền.",
    task: "Viết mẫu email thông báo tự động về lãi tích lũy. Dùng: accrue, settlement, threshold, compliance, SLA.",
    visualType: "dashboardAlert"
  },
  {
    title: "Underwriting Criteria Update Memo",
    context: "Sau khi phân tích dữ liệu NPL, team Risk quyết định siết chặt tiêu chí bảo lãnh cho vay, đặc biệt với phân khúc khách hàng dưới 25 tuổi.",
    task: "Viết memo cập nhật tiêu chí underwriting mới cho toàn bộ team Risk và Sales. Dùng: underwrite, risk score, collateral, AML, KYC.",
    visualType: "dashboardAlert"
  },
  {
    title: "Syndicate Loan Proposal to Partner Banks",
    context: "Công ty muốn tổ chức một tổ hợp cho vay (syndicate) với 3 ngân hàng đối tác để cùng tài trợ cho một dự án cơ sở hạ tầng trị giá $50M.",
    task: "Viết proposal email gửi các ngân hàng đối tác, trình bày cấu trúc syndicate và điều kiện tham gia. Dùng: syndicate, underwrite, escrow, collateral, due diligence.",
    visualType: "presentation"
  },
  {
    title: "Whitelist Application for New Merchant",
    context: "Một merchant mới trong lĩnh vực crypto exchange muốn được đưa vào whitelist để có thể xử lý giao dịch trên nền tảng. AML team cần review kỹ.",
    task: "Viết email nội bộ yêu cầu AML team review và quyết định whitelist/blacklist merchant này. Dùng: whitelist, blacklist, AML, KYC, risk score.",
    visualType: "dashboardAlert"
  },
  {
    title: "Negotiation Summary After Partnership Deal",
    context: "Vừa kết thúc 3 buổi đàm phán với đối tác ngân hàng. Kết quả: phí interchange giảm từ 1.8% xuống 1.2%, SLA được cải thiện. Cần báo cáo lại với CEO.",
    task: "Viết email tóm tắt kết quả đàm phán và các điều khoản chính đã thống nhất. Dùng: negotiation, partnership, SLA, compliance, stakeholder.",
    visualType: "videoCall"
  },
  {
    title: "Retention Campaign Brief for Marketing",
    context: "Sau khi phân tích funnel, phát hiện 40% user rời bỏ sau 30 ngày do thiếu engagement. Marketing team cần thiết kế campaign giữ chân user.",
    task: "Viết creative brief gửi Marketing team, xác định mục tiêu retention và các KPI cần đạt. Dùng: retention, churn, funnel, conversion rate, KPI.",
    visualType: "chartDown"
  },
  {
    title: "Integration Failure Escalation Email",
    context: "API integration với đối tác ngân hàng bị lỗi từ sáng nay, ảnh hưởng đến 15% giao dịch của merchant. Đội kỹ thuật đang điều tra nhưng chưa tìm ra nguyên nhân.",
    task: "Viết escalation email tới CTO và team trưởng, trình bày tình hình và yêu cầu ưu tiên xử lý. Dùng: integration, incident, SLA, fallback, rollback.",
    visualType: "dashboardAlert"
  },
  {
    title: "Momentum Marketing Report to CEO",
    context: "Sau chiến dịch marketing tháng trước, các chỉ số tăng trưởng rất ấn tượng: user mới tăng 3x, organic traffic tăng 250%, và có dấu hiệu viral rõ rệt.",
    task: "Viết báo cáo marketing tháng gửi CEO, phân tích nguồn gốc momentum và kế hoạch duy trì. Dùng: momentum, traction, conversion rate, funnel, retention.",
    visualType: "presentation"
  },
  {
    title: "Rollback Decision During Go-live",
    context: "Tính năng mới vừa được deploy nhưng phát sinh bug nghiêm trọng khiến 5% giao dịch bị fail. CTO phải quyết định rollback ngay trong 30 phút.",
    task: "Viết incident communication nhanh gửi toàn bộ stakeholders về quyết định rollback và timeline khắc phục. Dùng: rollback, incident, go-live, SLA, uptime.",
    visualType: "dashboardAlert"
  },
  {
    title: "Benchmark Analysis Report for Investors",
    context: "Nhà đầu tư yêu cầu so sánh các chỉ số hoạt động của công ty với benchmark ngành fintech ASEAN để đánh giá khả năng cạnh tranh.",
    task: "Viết phần benchmark analysis trong investor deck, so sánh KPI với đối thủ. Dùng: benchmark, KPI, churn, retention, conversion rate.",
    visualType: "chartDown"
  },
  {
    title: "Liquidity Management Plan Email",
    context: "Cuối quý, một đối tác lớn thanh toán chậm 45 ngày khiến công ty đối mặt với gap thanh khoản $2M. CFO cần triển khai kế hoạch ứng phó.",
    task: "Viết kế hoạch quản lý thanh khoản ngắn hạn gửi CFO và Board, bao gồm các phương án tài trợ. Dùng: liquidity, leverage, collateral, runway, deficit.",
    visualType: "chartDown"
  },
  {
    title: "Scalability Test Results Summary",
    context: "Đội engineering vừa hoàn thành load test với kết quả: hệ thống có thể xử lý 25,000 TPS trước khi latency vượt ngưỡng SLA. Cần báo cáo cho CTO.",
    task: "Viết email tóm tắt kết quả test và đề xuất các bước nâng cấp tiếp theo. Dùng: scalable, throughput, latency, SLA, microservice.",
    visualType: "presentation"
  },
  {
    title: "KPI Dashboard Redesign Proposal",
    context: "Dashboard KPI hiện tại quá phức tạp, mỗi bộ phận có KPI riêng lẻ và không liên kết với nhau. CEO muốn một dashboard thống nhất.",
    task: "Viết đề xuất thiết kế lại KPI dashboard, xác định các chỉ số north star. Dùng: KPI, OKR, roadmap, stakeholder, benchmark.",
    visualType: "presentation"
  },
  {
    title: "Backlog Grooming Session Invitation",
    context: "Product Manager cần tổ chức buổi backlog grooming để sắp xếp lại priority cho sprint tiếp theo, sau khi nhận được feedback từ khách hàng quan trọng.",
    task: "Viết email mời toàn bộ team tham gia buổi backlog grooming, kèm agenda và chuẩn bị cần thiết. Dùng: backlog, sprint, agile, roadmap, OKR.",
    visualType: "videoCall"
  },
  {
    title: "Cross-border Payment Launch Announcement",
    context: "Công ty sắp ra mắt tính năng thanh toán xuyên biên giới cho 5 thị trường ASEAN. Đây là milestone quan trọng trong roadmap quốc tế hóa.",
    task: "Viết announcement email gửi toàn bộ merchant network về tính năng mới. Dùng: integration, KYC, compliance, go-live, milestone.",
    visualType: "presentation"
  },
  {
    title: "Portfolio Performance Review for Board",
    context: "Quý này, danh mục đầu tư của công ty có một số khoản tăng trưởng tốt nhưng cũng có khoản lỗ do market volatility. Board cần báo cáo đầy đủ.",
    task: "Viết báo cáo portfolio review gửi Board of Directors, phân tích hiệu suất và rủi ro. Dùng: portfolio, volatility, hedge, benchmark, arbitrage.",
    visualType: "chartDown"
  },
  {
    title: "Encryption Key Rotation Notice to Partners",
    context: "Theo lịch tuân thủ PCI DSS, tất cả khóa mã hóa phải được xoay trước ngày 30/11. Các API partner sẽ bị ảnh hưởng và cần được thông báo trước.",
    task: "Viết email thông báo cho toàn bộ API partner về việc xoay khóa mã hóa và các bước re-authentication cần thực hiện. Dùng: encryption, tokenization, API, compliance, go-live.",
    visualType: "dashboardAlert"
  },
  {
    title: "Embedded Lending Full Rollout Proposal",
    context: "MVP embedded lending đã hoàn thành giai đoạn pilot với 100 merchant và kết quả rất khả quan. CEO muốn anh chuẩn bị đề xuất triển khai rộng rãi.",
    task: "Viết đề xuất business case cho full rollout, nêu kết quả pilot, dự báo doanh thu và roadmap triển khai. Dùng: MVP, traction, underwrite, collateral, milestone.",
    visualType: "presentation"
  },
  {
    title: "Incident Post-Mortem: Cloud Vendor Outage",
    context: "Nhà cung cấp cloud bị outage 4,5 giờ làm suy giảm dịch vụ. Vi phạm SLA dẫn đến credit 20% hóa đơn. Engineering team đã kích hoạt fallback thành công.",
    task: "Viết báo cáo post-mortem gửi leadership, gồm timeline sự cố, tác động kinh doanh và các hành động phòng ngừa. Dùng: incident, SLA, fallback, uptime, rollback.",
    visualType: "dashboardAlert"
  },
];

const initialSpeakingData = [
  {
    title: "SLA Renegotiation",
    context: "Đối tác e-commerce bị sập gateway hôm qua do lỗi bên mình. Bạn đang họp online với họ.",
    role: "Khách hàng đang rất tức giận. Bạn cần xoa dịu và cam kết SLA uptime mới (99.99%). Dùng: compliance, stipulate, reconciliation.",
    visualType: "videoCall"
  },
  {
    title: "Pitching New Payment Gateway",
    context: "Trình bày với CFO về việc chuyển sang dùng cổng thanh toán mới rẻ hơn nhưng tích hợp khó hơn.",
    role: "CFO sẽ hỏi khó về ROI và rủi ro downtime lúc chuyển đổi. Dùng: EBITDA, overhead, scalable, leverage.",
    visualType: "presentation"
  },
  {
    title: "Explaining Chargeback to Merchant",
    context: "Một merchant nhỏ không hiểu tại sao tiền bị giữ lại 30 ngày sau khi bán hàng. Họ đang gọi điện phàn nàn về settlement cycle.",
    role: "Giải thích cho merchant hiểu về settlement, chargeback risk và tại sao cần holding period. Dùng: chargeback, settlement, compliance.",
    visualType: "videoCall"
  },
  {
    title: "Acquisition Proposal Pitch",
    context: "Công ty đang xem xét mua lại (acquire) một startup fintech nhỏ có 50k user. Bạn đang thuyết phục Board rằng đây là cơ hội tốt.",
    role: "Board sẽ hỏi về giá trị thực, due diligence và rủi ro tích hợp. Dùng: acquisition, due diligence, traction, scalable, milestone.",
    visualType: "presentation"
  },
  {
    title: "Liquidity Crisis Management",
    context: "Công ty gặp vấn đề thanh khoản ngắn hạn sau khi một đối tác lớn trì hoãn thanh toán. CFO đang họp khẩn với team.",
    role: "Trình bày phương án xử lý: vay ngắn hạn, cắt overhead, hoặc dùng leverage. Dùng: liquidity, overhead, collateral, deficit.",
    visualType: "videoCall"
  },
  {
    title: "Defending KYC Process to Regulator",
    context: "Thanh tra Ngân hàng Nhà nước đang audit quy trình KYC của công ty và đặt câu hỏi về tỷ lệ giao dịch bị AML flag nhưng không bị chặn.",
    role: "Anh cần trình bày quy trình KYC, giải thích tại sao một số giao dịch được pass qua và chứng minh sự tuân thủ. Dùng: KYC, AML, compliance, whitelist, risk score.",
    visualType: "videoCall"
  },
  {
    title: "Presenting Burn Rate to Lead Investor",
    context: "Nhà đầu tư lead trong vòng Series A đang lo ngại về burn rate và hỏi về chiến lược để kéo dài runway thêm ít nhất 6 tháng.",
    role: "Thuyết phục nhà đầu tư bằng cách trình bày kế hoạch cụ thể giảm burn rate và tăng revenue. Dùng: burn rate, runway, overhead, pivot, KPI.",
    visualType: "videoCall"
  },
  {
    title: "Sprint Review with Product Stakeholders",
    context: "Cuối sprint, team cần báo cáo những gì đã hoàn thành và demo tính năng mới cho các stakeholders nội bộ và đại diện khách hàng.",
    role: "Trình bày kết quả sprint, xử lý phản hồi và thảo luận priority cho backlog tiếp theo. Dùng: sprint, backlog, agile, milestone, roadmap.",
    visualType: "presentation"
  },
  {
    title: "API Integration Demo to Enterprise Client",
    context: "Một doanh nghiệp lớn đang xem xét tích hợp payment gateway của mình. Anh đang demo API trong môi trường sandbox trực tiếp với CTO của họ.",
    role: "Giải thích cách API hoạt động, đề cập latency, uptime SLA và quy trình go-live. Dùng: API, sandbox, latency, uptime, SLA, integration.",
    visualType: "presentation"
  },
  {
    title: "Explaining Tokenization to Security Team",
    context: "Đội Security của đối tác ngân hàng đang đặt câu hỏi về cơ chế bảo mật dữ liệu thẻ trong hệ thống của mình. Họ lo ngại về rủi ro data breach.",
    role: "Giải thích cơ chế tokenization và encryption, thuyết phục họ rằng dữ liệu thẻ được bảo vệ an toàn. Dùng: tokenization, encryption, compliance, whitelist, sandbox.",
    visualType: "videoCall"
  },
  {
    title: "Negotiating SLA with Cloud Vendor",
    context: "Nhà cung cấp cloud muốn tăng giá 25% khi gia hạn hợp đồng. Anh cần đàm phán giữ giá hoặc cải thiện SLA để justify chi phí.",
    role: "Dùng dữ liệu uptime thực tế và benchmark thị trường để lập luận. Đề xuất phương án win-win. Dùng: SLA, uptime, vendor, negotiation, benchmark.",
    visualType: "videoCall"
  },
  {
    title: "Incident Communication During Outage",
    context: "Hệ thống thanh toán đang bị outage nghiêm trọng, ảnh hưởng đến 30% giao dịch. Anh là on-call manager phải báo cáo real-time cho CEO và khách hàng.",
    role: "Cập nhật tình hình incident mỗi 15 phút, nêu nguyên nhân tạm thời và timeline dự kiến khắc phục. Dùng: incident, uptime, SLA, rollback, fallback.",
    visualType: "dashboardAlert"
  },
  {
    title: "Pitching MVP to Potential Partner",
    context: "Công ty đang pitching MVP của tính năng embedded lending mới cho một chuỗi bán lẻ lớn. Đây là buổi gặp mặt đầu tiên.",
    role: "Trình bày MVP trong 5 phút, nhấn mạnh traction sơ bộ và lộ trình scale. Xử lý câu hỏi về compliance. Dùng: MVP, traction, pivot, scalable, compliance.",
    visualType: "presentation"
  },
  {
    title: "Fraud Alert Review with Risk Team",
    context: "Hệ thống fraud detection vừa phát ra alert về một cluster 50 tài khoản có behavior bất thường. Risk team họp khẩn để quyết định có blacklist không.",
    role: "Dẫn dắt cuộc thảo luận, phân tích risk score của từng tài khoản và đề xuất hành động. Dùng: fraud detection, risk score, blacklist, AML, threshold.",
    visualType: "dashboardAlert"
  },
  {
    title: "Presenting Churn Analysis to CEO",
    context: "CEO yêu cầu phân tích tại sao churn tăng 5% trong quý vừa qua và đề xuất giải pháp cụ thể trong cuộc họp 1-on-1.",
    role: "Trình bày phân tích nguyên nhân churn, funnel drop-off và kế hoạch cải thiện retention. Dùng: churn, retention, funnel, conversion rate, OKR.",
    visualType: "presentation"
  },
  {
    title: "Acquisition Target Evaluation Meeting",
    context: "Board of Directors họp để đánh giá 3 startup fintech tiềm năng cho thương vụ M&A. Anh là người dẫn dắt phần đánh giá tài chính.",
    role: "Trình bày phân tích về traction, cap table và rủi ro dilution cho từng ứng viên. Dùng: acquisition, due diligence, cap table, dilution, traction.",
    visualType: "presentation"
  },
  {
    title: "Onboarding New Enterprise Merchant",
    context: "Một chuỗi siêu thị lớn với 200 cửa hàng vừa ký hợp đồng. Anh đang dẫn dắt buổi onboarding kick-off với team vận hành của họ.",
    role: "Giải thích quy trình onboarding, timeline và các yêu cầu về KYC, integration. Dùng: onboarding, KYC, integration, SLA, go-live.",
    visualType: "videoCall"
  },
  {
    title: "Defending Roadmap Priority to Sales Team",
    context: "Sales team yêu cầu Product team ưu tiên tính năng mà một khách hàng lớn đang yêu cầu, nhưng tính năng này không có trong roadmap hiện tại.",
    role: "Giải thích lý do ưu tiên và đề xuất phương án trade-off, giữ được mối quan hệ với Sales. Dùng: roadmap, backlog, OKR, stakeholder, milestone.",
    visualType: "presentation"
  },
  {
    title: "Explaining Escrow to B2B Client",
    context: "Khách hàng doanh nghiệp đang lo ngại về rủi ro khi phải thanh toán trước cho nhà cung cấp trong giao dịch B2B lớn. Anh đề xuất giải pháp escrow.",
    role: "Giải thích cơ chế escrow, quy trình giải phóng tiền và lợi ích bảo vệ cả 2 bên. Dùng: escrow, settlement, compliance, threshold, SLA.",
    visualType: "videoCall"
  },
  {
    title: "Microservice Architecture Presentation to CTO",
    context: "Anh đang thuyết phục CTO phê duyệt kế hoạch chuyển đổi kiến trúc từ monolith sang microservices với ngân sách $500K và timeline 12 tháng.",
    role: "Trình bày lợi ích về scalability, deployment speed và cost. Xử lý lo ngại về rủi ro migration. Dùng: microservice, scalable, deployment, circuit breaker, milestone.",
    visualType: "presentation"
  },
  {
    title: "OKR Setting Session with Direct Reports",
    context: "Đầu quý, anh cần dẫn dắt buổi OKR setting với team trực tiếp của mình, đảm bảo OKR của team align với OKR cấp công ty.",
    role: "Hướng dẫn team đặt objective rõ ràng và key result có thể đo lường. Xử lý bất đồng về target. Dùng: OKR, KPI, milestone, roadmap, stakeholder.",
    visualType: "videoCall"
  },
  {
    title: "Chargeback Dispute Call with Acquirer",
    context: "Acquirer bank đang yêu cầu giải trình về tỷ lệ chargeback tăng đột biến trong tháng qua và đe dọa tăng reserve requirement.",
    role: "Trình bày nguyên nhân, các biện pháp đã triển khai và cam kết giảm chargeback trong 30 ngày. Dùng: chargeback, fraud detection, compliance, threshold, reconciliation.",
    visualType: "videoCall"
  },
  {
    title: "Bootstrapped Startup Pitch to VC",
    context: "Startup của anh đã bootstrapped 2 năm và đang có lợi nhuận. Anh đang pitching lần đầu cho VC để gọi vốn Series A nhằm mở rộng thị trường.",
    role: "Nêu bật lợi thế của việc bootstrapped (kiểm soát tốt, không dilution sớm), trình bày kế hoạch dùng vốn. Dùng: bootstrapped, runway, burn rate, traction, cap table.",
    visualType: "presentation"
  },
  {
    title: "Settlement Cycle Improvement Proposal",
    context: "Merchant lớn đang yêu cầu rút ngắn settlement cycle từ T+2 xuống same-day. Anh phải đánh giá tính khả thi và trình bày với team Vận hành.",
    role: "Phân tích tác động đến liquidity, hệ thống reconciliation và đề xuất lộ trình thực hiện. Dùng: settlement, reconciliation, liquidity, throughput, SLA.",
    visualType: "videoCall"
  },
  {
    title: "Vendor Performance Review Meeting",
    context: "Cuối năm, anh cần review hiệu suất của nhà cung cấp dịch vụ outsource key account management, đối chiếu với SLA đã ký.",
    role: "Trình bày dữ liệu hiệu suất, chỉ ra các vi phạm SLA và đàm phán điều khoản cải thiện cho năm tới. Dùng: vendor, SLA, KPI, negotiation, procurement.",
    visualType: "videoCall"
  },
  {
    title: "Explaining Hedge Strategy to CFO",
    context: "CFO muốn hiểu tại sao Finance team đề xuất dùng currency forward contracts để hedge rủi ro tỷ giá, thay vì để tự nhiên như trước đây.",
    role: "Giải thích rõ cơ chế hedge, chi phí và lợi ích bảo vệ EBITDA trong môi trường tỷ giá biến động. Dùng: hedge, volatility, EBITDA, collateral, arbitrage.",
    visualType: "presentation"
  },
  {
    title: "Risk Score Calibration Review",
    context: "Mô hình risk score đang có false positive rate quá cao (20%), chặn nhầm nhiều giao dịch hợp lệ. Anh phải giải trình với Fraud & Risk committee.",
    role: "Phân tích nguyên nhân, đề xuất điều chỉnh ngưỡng và trình bày kế hoạch test mô hình mới. Dùng: risk score, fraud detection, threshold, whitelist, AML.",
    visualType: "dashboardAlert"
  },
  {
    title: "Partnership Proposal Call with Bank",
    context: "Anh đang trong cuộc gọi khám phá khả năng hợp tác với một ngân hàng quốc doanh lớn. Mục tiêu là tích hợp API để cung cấp dịch vụ vay tiêu dùng qua app ngân hàng.",
    role: "Trình bày giá trị hợp tác, mô hình doanh thu và yêu cầu kỹ thuật. Xử lý lo ngại về compliance. Dùng: partnership, API, integration, compliance, KYC.",
    visualType: "videoCall"
  },
  {
    title: "Explaining Amortization to Non-Finance Team",
    context: "CEO muốn team Product hiểu tại sao chi phí phát triển $1.2M không xuất hiện một lần trong P&L mà được trải đều trong 3 năm.",
    role: "Giải thích khái niệm amortization bằng ngôn ngữ đơn giản, kết nối với tác động lên EBITDA. Dùng: amortize, EBITDA, overhead, reconciliation, stakeholder.",
    visualType: "presentation"
  },
  {
    title: "Rollback Decision Making Under Pressure",
    context: "Tính năng mới vừa được deploy 2 giờ trước nhưng error rate đang tăng lên 8%. Anh là incident commander phải quyết định rollback hay tiếp tục fix trong 10 phút.",
    role: "Phân tích dữ liệu, cân nhắc rủi ro và ra quyết định rollback với justification rõ ràng. Dùng: rollback, incident, go-live, SLA, fallback.",
    visualType: "dashboardAlert"
  },
  {
    title: "Explaining Dilution to Founding Team",
    context: "Sau vòng Series B, một co-founder lo lắng vì tỷ lệ sở hữu của mình giảm từ 30% xuống 19%. Anh cần giải thích tại sao dilution này là chấp nhận được.",
    role: "Giải thích tại sao giá trị tuyệt đối tăng lên dù tỷ lệ % giảm, và so sánh trước/sau vòng đầu tư. Dùng: dilution, cap table, valuation, runway, traction.",
    visualType: "videoCall"
  },
  {
    title: "AML Investigation Briefing",
    context: "Hệ thống AML phát hiện một nhóm tài khoản có dấu hiệu structuring (chia nhỏ giao dịch để tránh reporting threshold). Anh phải briefing cho CEO.",
    role: "Trình bày kết quả điều tra, các tài khoản bị ảnh hưởng và kế hoạch báo cáo cho cơ quan chức năng. Dùng: AML, threshold, blacklist, compliance, KYC.",
    visualType: "dashboardAlert"
  },
  {
    title: "Iterative Product Improvement Session",
    context: "Sau khi thu thập feedback từ 100 user, team Product họp để quyết định những thay đổi ưu tiên nhất cho phiên bản tiếp theo của app.",
    role: "Dẫn dắt thảo luận về các cải tiến cần làm, dùng data để justify priority trong backlog. Dùng: iterate, backlog, sprint, MVP, retention.",
    visualType: "presentation"
  },
  {
    title: "Scalability Discussion with Infrastructure Team",
    context: "Một đối tác lớn vừa ký hợp đồng sẽ tăng gấp 5 lần traffic trong 3 tháng tới. Infrastructure team cần lên kế hoạch scale hệ thống.",
    role: "Dẫn dắt buổi planning, xác định bottleneck và phân bổ nguồn lực. Dùng: scalable, throughput, latency, microservice, circuit breaker.",
    visualType: "presentation"
  },
  {
    title: "Perpetual Bond Investment Pitch",
    context: "CFO đang trình bày với Board về đề xuất đầu tư vào trái phiếu vĩnh viễn (perpetual bond) của một ngân hàng ASEAN như một phần của chiến lược diversify portfolio.",
    role: "Trình bày lợi ích, rủi ro của perpetual bond và so sánh với các lựa chọn đầu tư khác. Dùng: perpetual, portfolio, hedge, volatility, liquidity.",
    visualType: "presentation"
  },
  {
    title: "Merchant Funnel Optimization Workshop",
    context: "Tỷ lệ merchant hoàn thành onboarding chỉ đạt 45%, với nhiều drop-off ở bước KYC. Team cần workshop để tìm nguyên nhân và giải pháp.",
    role: "Dẫn dắt workshop, phân tích từng bước trong funnel và đề xuất A/B test để cải thiện conversion. Dùng: funnel, conversion rate, KYC, onboarding, retention.",
    visualType: "presentation"
  },
  {
    title: "Underwriting Decision Explanation to Borrower",
    context: "Một SME khách hàng bị từ chối vay vì risk score thấp. Họ yêu cầu giải thích lý do và muốn biết cách cải thiện để apply lại.",
    role: "Giải thích quy trình underwriting một cách dễ hiểu, hướng dẫn khách hàng các bước cải thiện hồ sơ. Dùng: underwrite, risk score, collateral, KYC, compliance.",
    visualType: "videoCall"
  },
  {
    title: "Syndicate Investment Committee Presentation",
    context: "Anh đang trình bày cơ hội đầu tư syndicate vào một startup fintech cho một nhóm angel investors. Mục tiêu huy động $3M trong 2 tuần.",
    role: "Trình bày thesis đầu tư, traction của startup và cấu trúc deal. Xử lý câu hỏi về due diligence. Dùng: syndicate, due diligence, traction, cap table, runway.",
    visualType: "presentation"
  },
  {
    title: "Sprint Planning with Engineering Team",
    context: "Đầu sprint mới, Product Manager và Engineering Lead ngồi lại để chọn items từ backlog và ước tính effort cho sprint 2 tuần tới.",
    role: "Đàm phán về scope, giải thích ưu tiên business và đảm bảo team cam kết delivery milestone. Dùng: sprint, backlog, agile, milestone, OKR.",
    visualType: "videoCall"
  },
  {
    title: "Explaining Portfolio Risk to Board",
    context: "Biến động thị trường gần đây làm một số khoản đầu tư trong danh mục giảm giá trị. Board muốn nghe chiến lược risk management.",
    role: "Trình bày chiến lược diversification và hedge hiện tại, thuyết phục Board không cần hành động vội vàng. Dùng: portfolio, hedge, volatility, arbitrage, benchmark.",
    visualType: "presentation"
  },
  {
    title: "Go-live Countdown Meeting",
    context: "48 giờ trước go-live của hệ thống mới, anh tổ chức họp final check với tất cả team: Engineering, Operations, Compliance và Customer Support.",
    role: "Chủ trì cuộc họp, kiểm tra từng hạng mục checklist và quyết định go/no-go. Dùng: go-live, SLA, rollback, fallback, incident.",
    visualType: "dashboardAlert"
  },
  {
    title: "Accrued Liability Explanation to Auditor",
    context: "Kiểm toán viên đang hỏi về một khoản accrued liability lớn trong bảng cân đối kế toán liên quan đến lãi tích lũy từ các khoản vay chưa đến hạn.",
    role: "Giải thích cơ sở ghi nhận accrual, phương pháp tính toán và tác động lên báo cáo tài chính. Dùng: accrue, reconciliation, compliance, amortize, EBITDA.",
    visualType: "videoCall"
  },
  {
    title: "Cross-sell Pitch to Existing Merchant",
    context: "Merchant hiện tại đang dùng payment gateway của mình. Anh muốn pitch thêm sản phẩm working capital loan và dịch vụ FX cho họ.",
    role: "Giới thiệu sản phẩm mới một cách tự nhiên, kết nối với pain point hiện tại của merchant. Dùng: liquidity, collateral, settlement, conversion rate, partnership.",
    visualType: "videoCall"
  },
  {
    title: "Data Breach Incident Response Call",
    context: "Security team phát hiện dấu hiệu data breach tiềm năng ảnh hưởng đến thông tin thẻ của 5,000 user. Cuộc họp khẩn cấp được triệu tập.",
    role: "Điều phối response, đảm bảo tokenization đã bảo vệ dữ liệu thẻ và lên kế hoạch thông báo cho user và cơ quan quản lý. Dùng: tokenization, encryption, incident, compliance, AML.",
    visualType: "dashboardAlert"
  },
  {
    title: "Negotiating Payment Terms with Supplier",
    context: "Nhà cung cấp dịch vụ đang yêu cầu thanh toán 100% trước khi cung cấp dịch vụ. Anh muốn đàm phán để được trả 50% trước và 50% sau khi nhận dịch vụ.",
    role: "Đàm phán điều khoản thanh toán, đề xuất phương án escrow như bảo đảm trung gian. Dùng: negotiation, escrow, settlement, compliance, stakeholder.",
    visualType: "videoCall"
  },
  {
    title: "Defending Roadmap Against Scope Creep",
    context: "Một khách hàng Enterprise VIP đang trực tiếp gọi điện cho CEO yêu cầu thêm tính năng custom không có trong roadmap Q4. CEO yêu cầu anh giải thích.",
    role: "Giải thích cho CEO và khách hàng tại sao không thể thêm vào sprint hiện tại, đề xuất phương án backlog. Dùng: roadmap, backlog, sprint, OKR, milestone.",
    visualType: "videoCall"
  },
  {
    title: "Explaining Accrual Accounting to Merchant",
    context: "Merchant đang thắc mắc tại sao dashboard hiển thị revenue cao hơn số tiền thực tế về tài khoản của họ. Anh cần giải thích cơ chế accrual trong hệ thống.",
    role: "Giải thích sự khác biệt giữa accrued revenue và cash received bằng ngôn ngữ đơn giản. Dùng: accrue, settlement, reconciliation, SLA, throughput.",
    visualType: "videoCall"
  },
  {
    title: "Presenting Portfolio Diversification Strategy",
    context: "CFO muốn anh trình bày chiến lược đa dạng hóa danh mục đầu tư để giảm rủi ro tập trung sau khi một khoản đầu tư lớn bị lỗ do thị trường biến động.",
    role: "Trình bày chiến lược phân bổ danh mục mới, bao gồm tỷ trọng từng loại tài sản và các công cụ hedge. Dùng: portfolio, hedge, volatility, benchmark, arbitrage.",
    visualType: "presentation"
  },
  {
    title: "Explaining Syndicate Structure to Junior Team",
    context: "Team tài chính cần hiểu cách hoạt động của cấu trúc đồng tài trợ (syndicate lending) mà công ty vừa ký kết với 3 ngân hàng đối tác.",
    role: "Giải thích cơ chế chia sẻ rủi ro và lợi nhuận trong syndicate, tại sao nó tốt hơn so với cho vay đơn lẻ. Dùng: syndicate, underwrite, collateral, portfolio, due diligence.",
    visualType: "presentation"
  },
  {
    title: "Headcount Reduction Discussion with Team Lead",
    context: "Do burn rate vượt ngân sách, COO yêu cầu anh đề xuất kế hoạch giảm headcount trong engineering team mà vẫn giữ được velocity sản phẩm.",
    role: "Thảo luận với Team Lead về ai nên được ưu tiên giữ lại dựa trên OKR đóng góp và kế hoạch roadmap. Dùng: headcount, burn rate, OKR, roadmap, attrition.",
    visualType: "videoCall"
  },
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
      "Network congestion during onboarding."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Đoạn văn nêu rõ: 'The discrepancy... suggests a potential flaw in our anti-fraud intermediary layer' — sự sai lệch số liệu chỉ ra lỗ hổng ở lớp trung gian chống gian lận, không phải ở quy trình đối soát hay chi phí overhead.",
    sampleSentence: "Our compliance team flagged a discrepancy in the anti-fraud intermediary layer, triggering an immediate reconciliation audit.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Q3 EBITDA Pressure",
    content: "Our Q3 EBITDA margin declined substantially, falling from 28% to 19% quarter-on-quarter. The primary driver was a 34% surge in overhead costs following the aggressive regional expansion in Southeast Asia. The CFO has mandated a comprehensive procurement review and stipulated that all vendor contracts exceeding $50,000 must go through a three-level approval process to restore compliance with our cost governance framework.",
    question: "What did the CFO mandate in response to the EBITDA decline?",
    options: [
      "Layoffs to reduce overhead costs immediately.",
      "A procurement review and stricter contract approval process.",
      "Cancellation of the Southeast Asia expansion.",
      "An emergency acquisition to boost revenue."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. CFO 'mandated a comprehensive procurement review and stipulated that all vendor contracts exceeding $50,000 must go through a three-level approval process' — yêu cầu rà soát thu mua và siết quy trình phê duyệt hợp đồng.",
    sampleSentence: "The CFO stipulated a three-level approval mandate for all procurement contracts to restore EBITDA margins.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Scalability Roadmap for Series B",
    content: "To support our Series B fundraising, the engineering team has completed due diligence on our current infrastructure. Our payment processing throughput stands at 8,000 TPS with a scalable architecture that can reach 50,000 TPS with a 3x cost increase. Key milestones include launching collateral-backed lending by Q2 and achieving full regulatory compliance across 5 Southeast Asian markets by Q4.",
    question: "What is the current transaction processing throughput?",
    options: [
      "50,000 TPS at full capacity.",
      "8,000 TPS with room to scale.",
      "3,000 TPS limited by compliance requirements.",
      "The memo does not mention throughput."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Đoạn văn ghi rõ 'payment processing throughput stands at 8,000 TPS with a scalable architecture that can reach 50,000 TPS' — hiện tại 8,000 TPS, có thể scale lên 50,000.",
    sampleSentence: "Our scalable architecture currently handles 8,000 TPS throughput and has clear milestones to reach 50,000 TPS before Series B closes.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Chargeback & Settlement Cycle Audit",
    content: "Following a regulatory mandate from the State Bank, we conducted a full audit of our chargeback and settlement processes. Our average settlement cycle is 2.1 business days, which is compliant with the T+2 requirement. However, our chargeback rate of 0.9% is approaching the 1% Visa threshold, primarily due to fluctuating fraud patterns from newly acquired merchants. The intermediary reconciliation layer has been flagged for an immediate upgrade to reduce discrepancies.",
    question: "Why is the chargeback rate considered a concern in the report?",
    options: [
      "It already exceeds the Visa 1% threshold.",
      "It is approaching the 1% Visa threshold due to fraud from new merchants.",
      "The settlement cycle is too slow, causing chargebacks to accumulate.",
      "The reconciliation layer generated false positives."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'chargeback rate of 0.9% is approaching the 1% Visa threshold, primarily due to fluctuating fraud patterns from newly acquired merchants' — tỷ lệ đang gần chạm ngưỡng, nguyên nhân từ merchant mới có fraud pattern bất thường.",
    sampleSentence: "The fluctuating chargeback rate from newly acquired merchants is approaching the compliance threshold, requiring an immediate reconciliation audit.",
    visualType: "invoice"
  },
  {
    title: "Memo: KYC Backlog Causing Onboarding Delay",
    content: "The compliance team reports a backlog of over 1,200 pending KYC verifications due to a surge in new merchant sign-ups. The current manual review process cannot handle the volume, causing average onboarding time to increase from 3 to 11 days. Management has approved budget for an AI-powered KYC automation tool to reduce the backlog within 30 days.",
    question: "What is the main reason for the increased onboarding time?",
    options: [
      "The AML system is blocking too many applications.",
      "The manual KYC review process cannot handle the high volume of applications.",
      "The new automation tool is slowing down the workflow.",
      "New regulation requires more documents for each merchant."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu rõ 'The current manual review process cannot handle the volume' — quy trình xét duyệt thủ công không đáp ứng được số lượng, khiến thời gian onboarding tăng từ 3 lên 11 ngày.",
    sampleSentence: "Automating our KYC onboarding process will reduce the backlog and restore compliance with our 3-day merchant onboarding SLA.",
    visualType: "dashboardAlert"
  },
  {
    title: "Alert: Burn Rate Exceeds Monthly Budget",
    content: "Finance has flagged that our October burn rate reached $340,000, which is 70% above the planned $200,000. The primary drivers are unexpected cloud infrastructure costs and the accelerated headcount plan. At this rate, our runway shortens from 14 months to just 8 months. The CFO is convening an emergency budget review to identify immediate cost reduction measures.",
    question: "By how many months did the runway shorten due to the high burn rate?",
    options: [
      "From 14 months to 10 months.",
      "From 14 months to 8 months.",
      "From 8 months to 4 months.",
      "The memo does not specify the runway impact."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu rõ 'our runway shortens from 14 months to just 8 months' — do burn rate vượt ngân sách, thời gian tồn tại giảm từ 14 xuống còn 8 tháng.",
    sampleSentence: "The elevated burn rate has compressed our runway from 14 to 8 months, making the emergency budget review a critical priority.",
    visualType: "chartDown"
  },
  {
    title: "Report: API Integration Performance Review",
    content: "Following the go-live of our banking API integration last quarter, we have recorded an average latency of 180ms, which is within the 200ms SLA threshold. Uptime stood at 99.91%, marginally exceeding our 99.9% commitment. However, two incidents during peak hours caused brief latency spikes to 900ms, which has been flagged for investigation by the infrastructure team.",
    question: "What issue was flagged for further investigation?",
    options: [
      "The average latency consistently exceeds the SLA threshold.",
      "Two incidents caused latency spikes to 900ms during peak hours.",
      "Uptime fell below the 99.9% SLA commitment.",
      "The API integration failed to go live on schedule."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'two incidents during peak hours caused brief latency spikes to 900ms, which has been flagged for investigation' — hai sự cố làm latency tăng vọt, cần điều tra.",
    sampleSentence: "Despite meeting our average latency SLA, the two peak-hour incidents revealed a fallback weakness that the infrastructure team must address before the next go-live.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Pivot Decision – B2C to B2B",
    content: "After six months of data analysis, the leadership team has decided to pivot our lending product from direct B2C consumer loans to B2B supply chain financing. Our B2C churn rate of 22% and high default rate proved the market fit was weak, while early B2B pilots showed a churn rate of just 4% and stronger retention metrics. The MVP for the B2B product will be launched in Q2.",
    question: "What data supported the decision to pivot to B2B?",
    options: [
      "B2C had a lower default rate than expected.",
      "B2B pilots showed lower churn and stronger retention than B2C.",
      "The B2B MVP was already ready for launch.",
      "Regulators mandated the shift away from B2C lending."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'B2B pilots showed a churn rate of just 4% and stronger retention metrics' — kết quả pilot B2B tốt hơn B2C về churn và retention, xác nhận quyết định pivot.",
    sampleSentence: "The B2B pivot was validated by pilot data showing a 4% churn rate, compared to the unsustainable 22% churn in our B2C lending product.",
    visualType: "presentation"
  },
  {
    title: "Report: Fraud Detection Model Accuracy",
    content: "Our updated machine learning fraud detection model achieved a 97.3% accuracy rate in the latest evaluation, up from 91.2% in the previous version. The false positive rate dropped from 15% to 4.8%, significantly reducing friction for legitimate customers. However, the model still struggles with novel fraud patterns not present in the training data, and requires monthly retraining to maintain performance.",
    question: "What improvement was noted in the false positive rate?",
    options: [
      "It increased from 4.8% to 15%, blocking more fraud.",
      "It decreased from 15% to 4.8%, reducing friction for legitimate users.",
      "It remained stable at 97.3%, matching overall model accuracy.",
      "The report does not mention the false positive rate."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The false positive rate dropped from 15% to 4.8%' — tỷ lệ chặn nhầm giảm từ 15% xuống 4.8%, giảm ma sát cho khách hàng hợp lệ.",
    sampleSentence: "The new fraud detection model's reduced false positive rate means fewer legitimate transactions are blocked, improving both security and customer experience.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Tokenization Audit Results",
    content: "The annual PCI DSS audit confirmed that our tokenization system successfully prevents storage of raw card data on our servers. All 47 million card-on-file records are stored as secure tokens. The auditor recommended strengthening encryption key rotation from annual to quarterly to further reduce risk. No compliance violations were identified during the review.",
    question: "What did the auditor recommend to improve security?",
    options: [
      "Replacing tokenization with a more advanced encryption algorithm.",
      "Rotating encryption keys more frequently, from annually to quarterly.",
      "Reducing the number of card-on-file records stored.",
      "Moving card data to an external compliance-certified vendor."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Kiểm toán viên 'recommended strengthening encryption key rotation from annual to quarterly' — đề xuất tăng tần suất xoay khóa mã hóa từ hàng năm lên hàng quý.",
    sampleSentence: "Following the audit, we will implement quarterly encryption key rotation to complement our tokenization system and maintain PCI DSS compliance.",
    visualType: "invoice"
  },
  {
    title: "Report: Series B Fundraising Update",
    content: "We are pleased to report that our Series B fundraising process is progressing well, with three term sheets received from top-tier VC firms. The lead investor has completed initial due diligence and expressed strong confidence in our traction metrics, including 180,000 active merchants and $4.2M monthly revenue. Closing is expected within 45 days, after which dilution for existing shareholders will be approximately 18%.",
    question: "What is the expected impact of the Series B closing on existing shareholders?",
    options: [
      "Shareholders will receive a cash distribution of 18%.",
      "Existing shareholders will experience approximately 18% dilution.",
      "The company will buy back 18% of outstanding shares.",
      "New shares will be issued at an 18% discount to current valuation."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'dilution for existing shareholders will be approximately 18%' — cổ đông hiện tại sẽ bị pha loãng khoảng 18% sau khi vòng Series B hoàn tất.",
    sampleSentence: "The 18% dilution from the Series B round is justified by the strong traction metrics that supported three competing term sheets.",
    visualType: "presentation"
  },
  {
    title: "Alert: AML System Flags Suspicious Cluster",
    content: "Our AML monitoring system has identified a cluster of 73 accounts exhibiting structuring behavior — making multiple transactions just below the $10,000 reporting threshold. These accounts have been temporarily suspended pending manual review by the compliance team. All flagged accounts have been placed on the internal blacklist, and a Suspicious Activity Report (SAR) will be filed within 24 hours.",
    question: "What behavior did the AML system detect in the flagged accounts?",
    options: [
      "Accounts making single large transactions above $10,000.",
      "Accounts making multiple transactions just below the $10,000 threshold to avoid reporting.",
      "Accounts with insufficient KYC documentation.",
      "Accounts attempting to whitelist themselves without authorization."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Hệ thống AML phát hiện 'structuring behavior — making multiple transactions just below the $10,000 reporting threshold' — chia nhỏ giao dịch để tránh ngưỡng báo cáo bắt buộc.",
    sampleSentence: "The AML system's detection of structuring behavior prevented a potential money laundering operation involving 73 blacklisted accounts.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: OKR Mid-Quarter Check-in",
    content: "At the midpoint of Q3, three out of five company-level OKRs are on track, while two are at risk. Our key result of reaching $5M monthly GMV is currently at 78% completion. The customer acquisition KPI is lagging at 52% due to higher-than-expected CAC in the new markets. The product team has been asked to iterate on the onboarding funnel to improve conversion rates before the end of the quarter.",
    question: "What is the status of the customer acquisition KPI?",
    options: [
      "It is ahead of schedule at 78% completion.",
      "It is lagging at 52% due to higher customer acquisition costs.",
      "It has been removed from the OKR framework this quarter.",
      "It exceeded the target, reaching 110% of the goal."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'The customer acquisition KPI is lagging at 52% due to higher-than-expected CAC' — chỉ số mới đạt 52%, chậm so với mục tiêu do chi phí mua khách cao hơn dự kiến.",
    sampleSentence: "The lagging customer acquisition KPI signals that we need to iterate on the top of the onboarding funnel to reduce CAC before the OKR deadline.",
    visualType: "chartDown"
  },
  {
    title: "Report: Infrastructure Scalability Test",
    content: "The engineering team completed a load test simulating 5x peak traffic to assess our system's scalability before the major retail partnership go-live. Results showed stable performance up to 18,000 TPS with latency remaining below 150ms. Above 18,000 TPS, the system experienced cascading failures across three microservices, triggering the circuit breaker pattern. We recommend upgrading the database layer before go-live to support 25,000 TPS safely.",
    question: "At what throughput level did the system begin to experience failures?",
    options: [
      "At 5,000 TPS during the initial warm-up phase.",
      "Above 18,000 TPS, where cascading microservice failures occurred.",
      "At 25,000 TPS, after the recommended database upgrade.",
      "The system did not fail during any phase of the test."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'Above 18,000 TPS, the system experienced cascading failures across three microservices' — hệ thống bắt đầu có vấn đề khi vượt quá 18,000 TPS.",
    sampleSentence: "The load test revealed that our circuit breaker pattern prevents full outages, but the database layer must be upgraded to handle 25,000 TPS before go-live.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Vendor Contract Renegotiation Outcome",
    content: "Following three rounds of negotiation, we have successfully renegotiated our cloud infrastructure contract, reducing annual costs by 22% in exchange for a three-year commitment. The new SLA includes a 99.95% uptime guarantee and a four-hour response time for P1 incidents, improvements over the previous 99.9% uptime and eight-hour response commitments. Total savings over the contract term are estimated at $1.8M.",
    question: "What improvement was made to the incident response time in the new SLA?",
    options: [
      "Response time for P1 incidents improved from four hours to two hours.",
      "Response time for P1 incidents improved from eight hours to four hours.",
      "The SLA now covers P2 incidents that were previously excluded.",
      "Uptime was reduced to 99.9% to accommodate faster response times."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'a four-hour response time for P1 incidents, improvements over the previous... eight-hour response commitments' — thời gian phản hồi sự cố P1 cải thiện từ 8 giờ xuống 4 giờ.",
    sampleSentence: "The renegotiated vendor SLA cuts P1 incident response time from eight to four hours, significantly improving our operational resilience.",
    visualType: "invoice"
  },
  {
    title: "Report: Merchant Retention Analysis Q3",
    content: "Merchant retention analysis for Q3 reveals a 90-day retention rate of 82%, up from 74% in Q2 following the launch of our same-day settlement feature. However, the conversion rate from trial to paid subscription dropped to 31%, below our 40% target. The primary reason cited by merchants who did not convert was the complexity of the KYC documentation requirements. The product team is prioritizing a streamlined KYC flow in the next sprint.",
    question: "Why did the trial-to-paid conversion rate fall short of the target?",
    options: [
      "The same-day settlement feature was not available to trial users.",
      "Merchants found the KYC documentation requirements too complex.",
      "The 90-day retention rate was too low to support conversion.",
      "Pricing was higher than competing products in the market."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Phân tích nêu 'The primary reason cited by merchants who did not convert was the complexity of the KYC documentation requirements' — yêu cầu KYC phức tạp là nguyên nhân chính gây ra tỷ lệ chuyển đổi thấp.",
    sampleSentence: "Simplifying the KYC flow in the next sprint is critical to recovering the trial conversion rate and hitting our Q4 retention targets.",
    visualType: "chartDown"
  },
  {
    title: "Alert: Rollback Executed After Deployment",
    content: "At 14:32 today, the engineering team executed a rollback of the v4.2.1 payment processing module after observing a 12% transaction failure rate within 90 minutes of deployment. The root cause was identified as an incompatibility between the new fraud scoring logic and the legacy settlement engine. The fallback to v4.1.9 restored normal operations within 8 minutes. A hotfix is being developed and will undergo full regression testing before the next deployment.",
    question: "What caused the rollback to be triggered?",
    options: [
      "The deployment exceeded the scheduled maintenance window.",
      "A 12% transaction failure rate was observed due to a fraud scoring incompatibility.",
      "The fallback system automatically detected an SLA breach.",
      "The legacy settlement engine was accidentally deleted during deployment."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'the engineering team executed a rollback... after observing a 12% transaction failure rate... due to an incompatibility between the new fraud scoring logic and the legacy settlement engine'.",
    sampleSentence: "The rapid rollback to v4.1.9 limited the blast radius to 90 minutes, but the fraud scoring incompatibility must be resolved before the next go-live attempt.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Cap Table Update After Series B",
    content: "Following the successful close of our $25M Series B round led by Southeast Asia Growth Fund, the updated cap table reflects new ownership distribution. Founders' combined stake has decreased from 52% to 38% due to the 18% dilution. The Employee Stock Option Pool (ESOP) has been increased from 8% to 12% as part of the agreement. All shareholders have been notified and updated legal documents are being prepared.",
    question: "What happened to the founders' ownership stake after the Series B close?",
    options: [
      "It increased from 38% to 52% due to new share issuance.",
      "It decreased from 52% to 38% due to dilution from the new funding round.",
      "It remained unchanged at 52% as dilution only affected early investors.",
      "It was entirely transferred to the ESOP pool as part of the agreement."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'Founders' combined stake has decreased from 52% to 38% due to the 18% dilution' — vòng Series B gây ra dilution khiến tỷ lệ sở hữu của founders giảm từ 52% xuống 38%.",
    sampleSentence: "While the Series B dilution reduced founders' stake from 52% to 38%, the increased ESOP pool will help attract senior talent for the next growth phase.",
    visualType: "invoice"
  },
  {
    title: "Report: AML Program Annual Assessment",
    content: "Our annual AML program assessment confirms full compliance with State Bank of Vietnam Circular 09 requirements. During the year, the system processed 42 million transactions and flagged 8,340 for enhanced review. Of these, 127 resulted in Suspicious Activity Reports (SARs) filed with authorities. The blacklist database was updated monthly and cross-referenced with FATF watchlists. No regulatory penalties were incurred.",
    question: "How many Suspicious Activity Reports were filed with authorities?",
    options: [
      "42 million, representing all processed transactions.",
      "127 SARs were filed out of 8,340 flagged transactions.",
      "8,340 SARs covering all enhanced review cases.",
      "No SARs were filed because no violations were found."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu '127 resulted in Suspicious Activity Reports (SARs) filed with authorities' — trong số 8,340 giao dịch bị flag, chỉ 127 trường hợp dẫn đến việc nộp SAR.",
    sampleSentence: "Filing 127 SARs from over 42 million transactions demonstrates that our AML system strikes the right balance between detection sensitivity and compliance accuracy.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Escrow Feature Launch for B2B",
    content: "The B2B escrow payment feature will go live on December 1st, allowing buyers to hold funds in a secure escrow account until delivery is confirmed. Funds are released automatically upon digital confirmation, or manually after a 5-business-day dispute window. The feature targets enterprise clients with transaction values above $50,000 and is expected to reduce payment disputes by 60% in the B2B segment.",
    question: "What triggers the automatic release of escrow funds?",
    options: [
      "Funds are released after a fixed 5-business-day holding period.",
      "Funds are released upon digital delivery confirmation from the buyer.",
      "Funds are released when the seller initiates a manual withdrawal request.",
      "Funds are released after compliance team approval for each transaction."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'Funds are released automatically upon digital confirmation' — tiền được giải phóng tự động khi người mua xác nhận giao hàng kỹ thuật số.",
    sampleSentence: "The escrow feature's automatic release mechanism upon digital confirmation removes the need for manual settlement intervention in B2B transactions above $50,000.",
    visualType: "invoice"
  },
  {
    title: "Report: Agile Transformation Results",
    content: "After six months of Agile transformation, deployment frequency has increased from monthly to bi-weekly, and the average time to resolve P2 incidents dropped from 72 to 18 hours. Sprint velocity improved by 40% following the introduction of structured backlog grooming sessions. However, stakeholder satisfaction scores remain at 6.2 out of 10, indicating that expectation alignment between product and business teams still needs improvement.",
    question: "What was the impact of Agile transformation on deployment frequency?",
    options: [
      "Deployments became less frequent, moving from bi-weekly to monthly.",
      "Deployment frequency increased from monthly to bi-weekly.",
      "Deployment frequency tripled from bi-weekly to three times per week.",
      "The transformation had no measurable impact on deployment frequency."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'deployment frequency has increased from monthly to bi-weekly' — tần suất deploy tăng từ hàng tháng lên hai tuần một lần sau khi áp dụng Agile.",
    sampleSentence: "The Agile transformation doubled our deployment frequency to bi-weekly sprints, but stakeholder alignment remains the key challenge for the next phase.",
    visualType: "presentation"
  },
  {
    title: "Alert: Perpetual Bond Coupon Payment Due",
    content: "Finance alerts that the annual coupon payment of $1.4M on our perpetual bonds is due on November 30th. Unlike standard bonds, these instruments have no maturity date, meaning the coupon obligation continues indefinitely. The treasury team has confirmed sufficient liquidity to cover the payment without accessing the credit facility. Accounting will record the payment as interest expense, separate from principal amortization.",
    question: "Why does the company's coupon obligation on these bonds continue indefinitely?",
    options: [
      "The company failed to repay the principal, extending the obligation.",
      "These are perpetual bonds, which have no maturity date.",
      "The bond agreement includes automatic rollover at the investor's discretion.",
      "Regulatory requirements mandate a 10-year minimum holding period."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert giải thích 'these instruments have no maturity date, meaning the coupon obligation continues indefinitely' — trái phiếu vĩnh viễn không có ngày đáo hạn nên nghĩa vụ trả lãi kéo dài mãi.",
    sampleSentence: "The perpetual bond structure provides long-term capital without dilution, but commits the company to an indefinite annual coupon obligation of $1.4M.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Microservice Migration Milestone",
    content: "The engineering team has successfully migrated six of the twelve planned microservices in Phase 1 of our architecture transformation. The payment routing service and fraud scoring engine are now running as independent microservices, reducing deployment coupling by 80%. The circuit breaker pattern has been implemented across all active services, with zero cascading failures recorded since migration. Phase 2 targets the settlement and reconciliation modules, with completion expected by Q2.",
    question: "What benefit was achieved by migrating to independent microservices?",
    options: [
      "Total system latency was reduced below 100ms for all transactions.",
      "Deployment coupling was reduced by 80%, lowering the risk of cascading failures.",
      "The number of microservices was cut from twelve to six for simplicity.",
      "The circuit breaker pattern was removed as it was no longer needed."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'reducing deployment coupling by 80%' — chuyển sang microservice độc lập giảm 80% sự phụ thuộc giữa các thành phần, hạn chế lỗi lan rộng.",
    sampleSentence: "Phase 1 of the microservice migration reduced deployment coupling by 80%, and zero cascading failures since go-live validates the circuit breaker implementation.",
    visualType: "presentation"
  },
  {
    title: "Report: Hedging Program Performance",
    content: "Our FX hedging program, initiated in Q1, has successfully protected $3.2M in revenue from currency volatility during the USD/VND fluctuation this quarter. The program uses 90-day forward contracts to lock in exchange rates for projected USD inflows. The net cost of the hedging program is $185,000 in premiums, resulting in a net protection benefit of $3.0M. The treasury team recommends expanding coverage to 80% of projected foreign currency revenue.",
    question: "What is the net protection benefit of the hedging program this quarter?",
    options: [
      "$3.2M, representing the full value of revenue protected.",
      "$3.0M, after deducting $185,000 in hedging premiums.",
      "$185,000, which is the cost of the forward contracts.",
      "The program resulted in a net loss due to premium costs."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'net cost of the hedging program is $185,000 in premiums, resulting in a net protection benefit of $3.0M' — lợi ích ròng là $3.0M sau khi trừ phí $185,000.",
    sampleSentence: "The FX hedging program's $3.0M net protection benefit far outweighs the $185,000 premium cost, making expansion to 80% coverage a sound treasury decision.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Sandbox Environment Upgrade",
    content: "Effective immediately, the sandbox environment has been upgraded to mirror production data volumes and API response behavior. This change allows partners to conduct more realistic integration testing before go-live. All API keys issued in sandbox will need to be regenerated as part of the upgrade. Partners are advised to complete re-testing within 21 days to stay on schedule for their planned go-live dates.",
    question: "Why do partners need to regenerate their sandbox API keys?",
    options: [
      "The sandbox URL has changed and old keys will no longer route correctly.",
      "API keys must be regenerated as part of the sandbox environment upgrade.",
      "Keys expired automatically after the 90-day sandbox trial period.",
      "The upgrade requires partners to switch from REST to GraphQL APIs."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'All API keys issued in sandbox will need to be regenerated as part of the upgrade' — đây là yêu cầu bắt buộc của quá trình nâng cấp môi trường sandbox.",
    sampleSentence: "Partners must regenerate their sandbox API keys within 21 days to ensure their integration testing remains on schedule for the planned go-live.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Working Capital Lending Portfolio Q3",
    content: "The working capital lending portfolio grew to $45M in outstanding loans this quarter, with an NPL ratio of 2.1%, within our 3% risk appetite. The average loan size is $22,500, with a 90-day term. Collateral coverage stands at 1.4x, providing adequate buffer against default risk. The underwriting team tightened risk score thresholds for applicants with less than 12 months of transaction history, reducing new NPL formation by 35%.",
    question: "What action did the underwriting team take to reduce new NPL formation?",
    options: [
      "They increased collateral requirements from 1.4x to 2.0x for all borrowers.",
      "They tightened risk score thresholds for borrowers with less than 12 months of transaction history.",
      "They reduced the maximum loan size from $22,500 to $15,000.",
      "They partnered with a third-party KYC provider to improve identity verification."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The underwriting team tightened risk score thresholds for applicants with less than 12 months of transaction history' — siết ngưỡng risk score với borrower ít lịch sử giao dịch.",
    sampleSentence: "Tightening underwriting risk score thresholds for thin-file borrowers has reduced new NPL formation by 35% while keeping collateral coverage at a healthy 1.4x.",
    visualType: "invoice"
  },
  {
    title: "Alert: Chargeback Threshold Breached",
    content: "URGENT: Our October chargeback rate reached 1.08%, breaching Visa's 1.0% threshold. Visa has placed us on the High Chargeback Merchant monitoring program, which requires monthly reporting and a remediation plan within 30 days. Failure to reduce the rate below 0.9% within 90 days may result in fines of up to $25,000 per month and potential suspension of card acceptance privileges. Risk team is convening an emergency session at 14:00 today.",
    question: "What could happen if the chargeback rate is not reduced within 90 days?",
    options: [
      "Visa will automatically block all transactions above $500.",
      "The company may face fines of up to $25,000 per month and potential card acceptance suspension.",
      "The company will be required to undergo a full KYC re-verification process.",
      "The settlement cycle will be extended from T+2 to T+5 as a penalty."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu rõ 'fines of up to $25,000 per month and potential suspension of card acceptance privileges' — đây là các hậu quả pháp lý và vận hành nghiêm trọng nếu không cải thiện.",
    sampleSentence: "The chargeback threshold breach puts us at risk of $25,000 monthly fines, making fraud detection improvements the most urgent operational priority.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Bootstrapped Acquisition Rationale",
    content: "The proposed acquisition of PayFlow, a bootstrapped SME lending startup, presents a strategic opportunity to accelerate our entry into the supply chain finance market. PayFlow has reached profitability without external funding, demonstrating strong unit economics with an LTV/CAC ratio of 4.2x. Their 18,000 active SME clients and $8M ARR will add immediate revenue traction to our portfolio. Due diligence is expected to complete within 45 days, with escrow funds held pending regulatory approval.",
    question: "What makes PayFlow's financial model particularly attractive to the acquirer?",
    options: [
      "PayFlow has raised three funding rounds from top-tier VCs.",
      "PayFlow reached profitability without external funding, showing strong unit economics.",
      "PayFlow's ARR is entirely from recurring subscription fees with no chargeback risk.",
      "PayFlow's 18,000 clients are all enterprise accounts with average deal sizes above $100K."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'PayFlow has reached profitability without external funding, demonstrating strong unit economics' — khả năng đạt lợi nhuận mà không cần vốn bên ngoài là dấu hiệu của mô hình kinh doanh lành mạnh.",
    sampleSentence: "PayFlow's bootstrapped path to profitability and 4.2x LTV/CAC ratio are the strongest indicators of sustainable unit economics in our due diligence findings.",
    visualType: "invoice"
  },
  {
    title: "Report: Attrition Impact on Engineering Team",
    content: "Engineering attrition reached 28% in the past 12 months, resulting in the loss of 14 experienced engineers. The total cost of attrition is estimated at $1.4M, including recruitment, onboarding, and productivity ramp-up costs. Exit interview data indicates that primary drivers are compensation below market benchmark and limited career growth visibility. HR recommends a retention program including equity refreshes and structured career progression OKRs.",
    question: "What are the primary drivers of engineering attrition identified in exit interviews?",
    options: [
      "Poor working conditions and a toxic team culture.",
      "Below-market compensation and limited career growth visibility.",
      "Excessive overtime requirements and unclear OKRs.",
      "Dissatisfaction with the technical stack and tooling choices."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'primary drivers are compensation below market benchmark and limited career growth visibility' — lương thấp hơn thị trường và thiếu lộ trình thăng tiến rõ ràng là nguyên nhân chính.",
    sampleSentence: "Addressing the two primary attrition drivers — below-benchmark compensation and unclear career OKRs — is essential to reducing the $1.4M annual cost of engineering turnover.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Q4 Roadmap Prioritization",
    content: "Following the Q3 OKR review and stakeholder input sessions, the Q4 product roadmap has been finalized with three priority tracks. First, compliance automation will reduce manual KYC review time by 70%. Second, the merchant analytics dashboard will deliver real-time settlement and chargeback data. Third, the embedded lending MVP will be released to 100 pilot merchants. Items not included in Q4 have been moved to the backlog for Q1 re-prioritization.",
    question: "What will the merchant analytics dashboard provide according to the Q4 roadmap?",
    options: [
      "Predictive revenue forecasting using AI-powered models.",
      "Real-time settlement and chargeback data for merchants.",
      "Automated KYC document collection from merchant partners.",
      "Integration with third-party accounting software for reconciliation."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'the merchant analytics dashboard will deliver real-time settlement and chargeback data' — tính năng này cung cấp dữ liệu thời gian thực về quyết toán và hoàn tiền cho merchant.",
    sampleSentence: "The Q4 merchant analytics dashboard will give merchants real-time visibility into settlement cycles and chargeback trends, directly addressing their top pain points.",
    visualType: "presentation"
  },
  {
    title: "Report: Conversion Funnel Optimization Results",
    content: "Following a 6-week A/B test on our merchant onboarding funnel, the redesigned 3-step KYC flow achieved a 67% completion rate, up from 41% with the previous 7-step flow. The overall trial-to-activation conversion rate improved from 28% to 44%, exceeding our 40% OKR target by 10%. The simplified funnel is now being rolled out to all new merchant sign-ups, and the old flow has been deprecated.",
    question: "By how much did the trial-to-activation conversion rate improve?",
    options: [
      "From 41% to 67%, an improvement of 26 percentage points.",
      "From 28% to 44%, an improvement of 16 percentage points.",
      "From 40% to 44%, just slightly above the OKR target.",
      "From 28% to 67%, more than doubling the original rate."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'trial-to-activation conversion rate improved from 28% to 44%' — đây là tỷ lệ chuyển đổi từ trial sang activation, tăng 16 điểm phần trăm và vượt mục tiêu OKR.",
    sampleSentence: "The 28% to 44% improvement in trial-to-activation conversion rate validates our decision to simplify the KYC funnel from seven steps to three.",
    visualType: "chartDown"
  },
  {
    title: "Alert: Go-live Delayed Due to Compliance Gap",
    content: "The planned December 1st go-live of the cross-border payment feature has been postponed following a compliance review that identified gaps in our AML screening for non-resident users. The State Bank of Vietnam requires enhanced due diligence for all cross-border transactions above $5,000, which our current system does not fully support. Engineering has been tasked with implementing the required controls within 21 days. A revised go-live date of December 22nd has been proposed.",
    question: "Why was the go-live of the cross-border payment feature postponed?",
    options: [
      "Engineering could not complete API integration within the original timeline.",
      "A compliance gap was identified in AML screening for non-resident users.",
      "The State Bank revoked the company's cross-border payment license.",
      "Merchant demand for the feature was lower than expected."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'a compliance review that identified gaps in our AML screening for non-resident users' — lỗ hổng trong hệ thống AML là nguyên nhân trì hoãn go-live.",
    sampleSentence: "The AML compliance gap for non-resident transactions is a critical blocker that must be resolved before the revised December 22nd go-live can proceed.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Risk Score Model Deployment",
    content: "The new risk scoring model v3.0 will be deployed to production on November 15th following successful sandbox validation. The model uses 47 behavioral and transactional features to assign a risk score between 0 and 1,000 to each transaction. Transactions scoring above 750 will be automatically declined, while those between 500 and 750 will require step-up authentication. All merchants have been informed that decline rates may temporarily increase by 2-3% during the initial calibration period.",
    question: "What happens to transactions that score between 500 and 750 in the new model?",
    options: [
      "They are automatically approved without any additional checks.",
      "They require step-up authentication before being processed.",
      "They are automatically declined, the same as scores above 750.",
      "They are flagged for manual review by the compliance team."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'those between 500 and 750 will require step-up authentication' — giao dịch trong khoảng trung bình không tự động bị từ chối mà yêu cầu xác thực thêm.",
    sampleSentence: "The risk score model's step-up authentication for mid-range scores balances fraud prevention with a smooth experience for legitimate customers.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Liquidity Management Q3 Review",
    content: "Treasury reports that our liquidity position remains strong, with $12.4M in unrestricted cash and a current ratio of 2.3x. The revolving credit facility of $10M remains undrawn, providing additional buffer. Receivables from three enterprise clients totaling $3.8M are now 45 days overdue, creating a near-term liquidity gap that is being managed through accelerated collection and a $2M short-term drawdown from the credit facility. The CFO does not anticipate any impact on our 12-month runway.",
    question: "How is the company managing the near-term liquidity gap from overdue receivables?",
    options: [
      "By issuing new equity to raise emergency capital from existing shareholders.",
      "Through accelerated collection and a $2M short-term credit facility drawdown.",
      "By selling portions of the investment portfolio to generate immediate cash.",
      "By extending payment terms with vendors to defer outflows."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'being managed through accelerated collection and a $2M short-term drawdown from the credit facility' — hai biện pháp kết hợp để xử lý gap thanh khoản ngắn hạn.",
    sampleSentence: "The $2M credit facility drawdown bridges the liquidity gap from overdue enterprise receivables without impacting our overall 12-month runway.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Syndicate Lending Program Launch",
    content: "We are pleased to announce the launch of our co-lending syndicate program in partnership with three commercial banks. Under the program, we will originate SME loans and syndicate 70% of the principal to partner banks, retaining 30% on our own balance sheet. This structure allows us to scale the lending portfolio to $100M without proportional increases in capital requirements. The underwriting standards and risk scoring model will be jointly maintained by all syndicate members.",
    question: "What is the key benefit of the syndicate structure for our capital requirements?",
    options: [
      "It eliminates the need for collateral in the underwriting process.",
      "It allows loan portfolio scaling without proportional increases in capital requirements.",
      "It transfers all credit risk to the partner banks, removing it from our balance sheet.",
      "It qualifies the company for preferential regulatory treatment on capital ratios."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'allows us to scale the lending portfolio to $100M without proportional increases in capital requirements' — cấu trúc syndicate cho phép mở rộng danh mục mà không cần tăng vốn tương ứng.",
    sampleSentence: "The 70/30 syndicate structure is a capital-efficient way to scale the lending portfolio to $100M while keeping risk concentrated at the 30% retention level.",
    visualType: "presentation"
  },
  {
    title: "Alert: Uptime SLA Breach Notification",
    content: "We are issuing this alert to notify all stakeholders that our payment processing service experienced 4.2 hours of downtime across three separate incidents in October, resulting in a monthly uptime of 99.43%. This is below our contractual SLA commitment of 99.9%, which translates to a maximum allowable downtime of 43.8 minutes per month. Under the SLA penalty clause, affected merchants are entitled to a 15% service credit for October. The engineering team has completed a root cause analysis and implemented a new circuit breaker configuration to prevent recurrence.",
    question: "What are merchants entitled to receive due to the SLA breach?",
    options: [
      "A full refund of all transaction fees paid in October.",
      "A 15% service credit for October under the SLA penalty clause.",
      "An extended settlement cycle of T+3 as compensation.",
      "Priority customer support for the next three months."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'affected merchants are entitled to a 15% service credit for October' — đây là điều khoản phạt trong SLA khi uptime cam kết bị vi phạm.",
    sampleSentence: "The 99.43% uptime in October triggered the SLA penalty clause, entitling affected merchants to a 15% service credit and requiring a root cause action plan.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Q4 Sprint Planning Complete",
    content: "The product team has completed Q4 sprint planning with twelve two-week sprints mapped to roadmap deliverables. The highest priority items in the backlog are the AML automation module, the merchant analytics dashboard, and the embedded lending API. Each sprint will be reviewed by stakeholders in a bi-weekly demo session. Incomplete backlog items will be carried forward with revised priority scores.",
    question: "How often will stakeholders review sprint progress?",
    options: [
      "Once per month at the end of each sprint cycle.",
      "In bi-weekly demo sessions after each sprint.",
      "Quarterly, aligned with the OKR review schedule.",
      "Only at the end of the Q4 roadmap delivery."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'Each sprint will be reviewed by stakeholders in a bi-weekly demo session' — các stakeholders sẽ xem xét tiến độ mỗi 2 tuần sau mỗi sprint.",
    sampleSentence: "The bi-weekly stakeholder demo sessions create accountability for each sprint delivery and align the roadmap with changing business priorities.",
    visualType: "presentation"
  },
  {
    title: "Alert: High Attrition in Compliance Team",
    content: "HR reports that the compliance team has experienced a 35% attrition rate in the past six months, driven primarily by compensation gaps with major banks and limited remote work flexibility. The loss of three senior AML analysts has created a critical knowledge gap that is delaying the quarterly regulatory report. Management has approved emergency retention bonuses and a revised headcount plan to hire five new compliance officers.",
    question: "What immediate action did management take in response to the attrition?",
    options: [
      "Management outsourced the AML function to a third-party vendor.",
      "Management approved retention bonuses and a new headcount plan.",
      "Management decided to automate the compliance function entirely.",
      "Management merged the compliance team with the risk team."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'Management has approved emergency retention bonuses and a revised headcount plan' — phản ứng ngay lập tức là thưởng giữ chân và kế hoạch tuyển dụng bổ sung.",
    sampleSentence: "Emergency retention bonuses can slow attrition in the short term, but long-term headcount stability requires addressing the root causes of compensation gaps.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Arbitrage Savings from Multi-Network Routing",
    content: "By implementing intelligent transaction routing across four payment networks, our merchants saved a total of $2.1M in processing fees during Q3. The routing engine selects the lowest-cost network for each transaction based on card type, geography, and real-time network rates. The arbitrage opportunity was largest for cross-border transactions, where fee differences between networks ranged from 0.4% to 1.2%. The system processes routing decisions in under 15 milliseconds.",
    question: "What factors does the routing engine use to select a payment network?",
    options: [
      "Card type, merchant category code, and transaction time of day.",
      "Card type, geography, and real-time network rates.",
      "Transaction amount, chargeback history, and AML risk score.",
      "Only network uptime and SLA performance metrics."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The routing engine selects the lowest-cost network for each transaction based on card type, geography, and real-time network rates' — ba yếu tố để tối ưu chi phí.",
    sampleSentence: "Intelligent multi-network routing leverages arbitrage opportunities between payment networks to save merchants up to 1.2% on cross-border transaction fees.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Accrual Accounting Policy for Loan Interest",
    content: "Effective this quarter, all loan interest will be recognized on an accrual basis, meaning interest income is recorded as it is earned daily, regardless of when cash is received. This change aligns our accounting with IFRS 9 requirements and provides a more accurate picture of monthly profitability. The reconciliation between accrued and cash-received interest will be reported in the monthly finance dashboard. Controllers should flag any discrepancies above $10,000 for immediate review.",
    question: "Why is the company switching to accrual accounting for loan interest?",
    options: [
      "To reduce taxable income by deferring interest recognition.",
      "To align with IFRS 9 and more accurately reflect monthly profitability.",
      "To simplify reconciliation by eliminating accrued interest entries.",
      "To comply with a new State Bank mandate requiring cash-basis reporting."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'This change aligns our accounting with IFRS 9 requirements and provides a more accurate picture of monthly profitability' — mục đích chính là tuân thủ chuẩn mực kế toán và phản ánh lợi nhuận chính xác hơn.",
    sampleSentence: "Switching to accrual-basis interest recognition ensures our monthly P&L reflects the true economic earnings of the lending portfolio, not just cash receipts.",
    visualType: "invoice"
  },
  {
    title: "Alert: Vendor SLA Breach – Cloud Provider",
    content: "Our primary cloud infrastructure provider experienced a regional outage from 02:14 to 06:47 today, resulting in 4.5 hours of degraded service. Under our SLA terms, this constitutes a Level 1 breach, triggering a 20% credit on the monthly invoice. The vendor has provided a preliminary root cause analysis citing a misconfigured network routing update. Our engineering team activated the fallback infrastructure, which maintained 80% capacity throughout the incident.",
    question: "How did the company's system respond during the cloud vendor outage?",
    options: [
      "All services went offline and were restored only after the vendor fixed the issue.",
      "The fallback infrastructure maintained 80% capacity throughout the incident.",
      "Engineering manually rerouted traffic, causing a 2-hour complete outage.",
      "The circuit breaker pattern shut down all non-essential microservices."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'Our engineering team activated the fallback infrastructure, which maintained 80% capacity throughout the incident' — hệ thống dự phòng đảm bảo dịch vụ tiếp tục ở mức 80%.",
    sampleSentence: "The fallback infrastructure's ability to sustain 80% capacity during the cloud outage validated our resilience investment and limited the SLA breach impact.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Perpetual Bond Market Analysis",
    content: "The treasury team has completed a market analysis of perpetual bond opportunities from investment-grade ASEAN financial institutions. Yields range from 4.2% to 6.8% annually, offering attractive returns relative to the regional benchmark rate of 3.5%. As perpetual bonds carry no maturity date, the primary risk is the issuer's ability to sustain coupon payments indefinitely. The analysis recommends allocating 15% of the portfolio to perpetual bonds, hedged against interest rate volatility.",
    question: "What is the primary risk associated with perpetual bonds according to the analysis?",
    options: [
      "The bonds may be called early, forcing reinvestment at lower rates.",
      "The issuer may be unable to sustain indefinite coupon payments.",
      "Perpetual bonds are not eligible for hedging against interest rate risk.",
      "The bonds are below investment grade and carry excessive credit risk."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Phân tích nêu 'the primary risk is the issuer's ability to sustain coupon payments indefinitely' — vì không có ngày đáo hạn, rủi ro chính là tổ chức phát hành có thể không trả lãi mãi mãi.",
    sampleSentence: "Before allocating 15% of the portfolio to perpetual bonds, the treasury team must thoroughly assess each issuer's long-term capacity to sustain coupon payments.",
    visualType: "chartDown"
  },
  {
    title: "Memo: Bootstrapped Startup Integration Plan",
    content: "Following the acquisition of PayFlow, a bootstrapped SME lending startup, the integration team has outlined a 90-day plan. In the first 30 days, we will consolidate KYC and AML systems to ensure compliance continuity. Between days 31-60, the PayFlow API will be migrated to our microservice architecture. The final phase covers data migration and merchant onboarding to our unified platform. PayFlow's cap table has been fully settled and all escrow funds released.",
    question: "What is the focus of the first 30 days of the integration plan?",
    options: [
      "Migrating the PayFlow API to the microservice architecture.",
      "Consolidating KYC and AML systems for compliance continuity.",
      "Onboarding PayFlow merchants to the unified platform.",
      "Releasing escrow funds and settling the cap table obligations."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'In the first 30 days, we will consolidate KYC and AML systems to ensure compliance continuity' — ưu tiên đầu tiên là đảm bảo tuân thủ trước khi làm bất cứ điều gì khác.",
    sampleSentence: "Prioritizing KYC and AML consolidation in the first 30 days of the PayFlow integration ensures we maintain full compliance continuity during the transition.",
    visualType: "invoice"
  },
  {
    title: "Report: Conversion Funnel by Merchant Segment",
    content: "Funnel analysis by merchant segment reveals significant differences in conversion rates. Enterprise merchants convert at 71%, while SME merchants convert at only 34%, and micro-merchants at 19%. The primary drop-off point for SME and micro-merchants is the document upload stage of KYC, where 58% of applicants abandon the process. The product team plans to introduce OCR-powered document capture and a simplified KYC flow targeted at these segments in the next sprint.",
    question: "Where in the funnel do most SME and micro-merchant drop-offs occur?",
    options: [
      "At the pricing page, where fees are perceived as too high.",
      "At the document upload stage of the KYC process.",
      "At the sandbox API testing phase before go-live.",
      "At the settlement configuration step after onboarding."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The primary drop-off point for SME and micro-merchants is the document upload stage of KYC, where 58% of applicants abandon the process'.",
    sampleSentence: "Simplifying the KYC document upload experience for SME merchants could recover a significant portion of the 58% funnel drop-off in that segment.",
    visualType: "chartDown"
  },
  {
    title: "Alert: Encryption Key Rotation Required",
    content: "As per the PCI DSS compliance schedule and auditor recommendations, all active encryption keys must be rotated by November 30th. Keys older than 12 months are currently flagged as non-compliant. The security team has prepared an automated rotation script that will update all keys without service interruption. All API partners using tokenized card data must re-authenticate after the rotation is complete. Failure to rotate before the deadline risks a compliance finding in the next audit.",
    question: "What happens to API partners after the encryption key rotation?",
    options: [
      "Partners will need to regenerate their tokenized card data from scratch.",
      "Partners must re-authenticate after the rotation is complete.",
      "Partners will be temporarily blacklisted until they update their integration.",
      "Partners will receive a 30-day grace period before re-authentication is required."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'All API partners using tokenized card data must re-authenticate after the rotation is complete' — đây là bước bắt buộc sau khi xoay khóa mã hóa.",
    sampleSentence: "Coordinating with API partners on re-authentication timelines is critical to ensuring the encryption key rotation completes without disrupting live integrations.",
    visualType: "dashboardAlert"
  },
  {
    title: "Memo: Runway Extension After Cost Optimization",
    content: "Following the emergency budget review, the finance team has identified $420,000 in monthly savings through three initiatives: renegotiating the cloud vendor contract ($180K), reducing discretionary marketing spend ($150K), and deferring two senior hires ($90K). These measures extend our runway from 8 months to 14 months, giving the team sufficient time to close the Series B round. The CFO cautions that further cuts would affect product velocity and retention.",
    question: "How did the cost optimization measures affect the company's runway?",
    options: [
      "Runway decreased from 14 months to 8 months due to reduced revenue.",
      "Runway extended from 8 months to 14 months through identified savings.",
      "Runway remained at 8 months as the savings offset new spending increases.",
      "Runway extended to 24 months, removing the urgency of the Series B raise."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'These measures extend our runway from 8 months to 14 months' — ba biện pháp tiết kiệm cộng lại $420K/tháng, kéo dài runway thêm 6 tháng.",
    sampleSentence: "The $420K monthly cost reduction extends our runway from 8 to 14 months, providing enough buffer to close the Series B before funds are depleted.",
    visualType: "chartDown"
  },
  {
    title: "Report: KPI Benchmarking Against ASEAN Peers",
    content: "Our annual benchmarking analysis comparing key performance indicators against eight ASEAN fintech peers reveals that our chargeback rate of 0.6% is best-in-class, while our 90-day merchant retention rate of 78% is below the peer median of 85%. Our API latency of 165ms is competitive but lags behind the top performer at 88ms. The analysis recommends prioritizing retention improvement initiatives and infrastructure upgrades to latency in the next roadmap cycle.",
    question: "In which KPI does the company lead its ASEAN peers?",
    options: [
      "90-day merchant retention rate, at the highest in the peer group.",
      "Chargeback rate of 0.6%, which is best-in-class among peers.",
      "API latency of 88ms, the fastest in the benchmarking group.",
      "Monthly GMV growth rate, which exceeds the peer median."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'our chargeback rate of 0.6% is best-in-class' — đây là chỉ số duy nhất đứng đầu so với các đối thủ ASEAN.",
    sampleSentence: "While our best-in-class 0.6% chargeback rate demonstrates strong fraud detection, closing the retention gap to the 85% peer median is the top priority for the next roadmap cycle.",
    visualType: "presentation"
  },
  {
    title: "Memo: Hedging Program Expansion Approved",
    content: "The Board has approved expanding our FX hedging program from covering 40% to 80% of projected USD revenue exposure. The expanded program will use a combination of 90-day forward contracts and options to provide both floor protection and upside participation. The net cost of the expansion is estimated at $95,000 per quarter in premiums. The treasury team will implement the new positions before the start of Q1 to fully protect next year's budgeted revenue.",
    question: "What financial instruments will the expanded hedging program use?",
    options: [
      "Perpetual bonds and equity derivatives to offset currency risk.",
      "A combination of 90-day forward contracts and options.",
      "Only currency options to maximize upside participation.",
      "Short-term syndicated loans denominated in USD."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Memo nêu 'The expanded program will use a combination of 90-day forward contracts and options' — kết hợp hai công cụ cho phép bảo vệ downside và vẫn hưởng upside.",
    sampleSentence: "Combining forward contracts with options in the expanded hedging program provides both guaranteed floor protection and the flexibility to benefit from favorable exchange rate movements.",
    visualType: "invoice"
  },
  {
    title: "Alert: Risk Score Threshold Adjustment",
    content: "Effective immediately, the fraud risk score threshold for automatic transaction decline has been raised from 700 to 750. This adjustment follows a two-week analysis showing that transactions scoring 700-749 had a fraud rate of only 0.8%, well below the 5% rate at which decline is operationally justified. The change is expected to reduce false positives by 18% and improve merchant revenue by approximately $340,000 per month. The whitelist for strategic enterprise merchants remains unchanged.",
    question: "Why was the decline threshold raised from 700 to 750?",
    options: [
      "A regulatory mandate required raising the threshold to reduce discrimination.",
      "Transactions scoring 700-749 had a low 0.8% fraud rate that did not justify decline.",
      "The fraud model was recalibrated and all existing scores increased by 50 points.",
      "Strategic merchants lobbied to have the threshold raised for their transaction types."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Alert nêu 'transactions scoring 700-749 had a fraud rate of only 0.8%, well below the 5% rate at which decline is operationally justified' — tỷ lệ gian lận thấp không đủ để justify việc từ chối giao dịch.",
    sampleSentence: "Raising the decline threshold based on data showing a 0.8% fraud rate at 700-749 reduces false positives by 18% while maintaining effective fraud protection above 750.",
    visualType: "dashboardAlert"
  },
  {
    title: "Report: Embedded Lending MVP Results",
    content: "The embedded lending MVP, deployed to 100 pilot merchants over 60 days, generated $1.8M in loan originations with an NPL rate of 1.4%, significantly below our 3% risk appetite. Merchant satisfaction scores averaged 8.6 out of 10, with the primary concern being the collateral documentation process. The underwriting model approved 67% of applications, with rejection rates highest among merchants with less than 6 months of transaction history on our platform. Full rollout is recommended for Q1.",
    question: "What was the primary merchant concern during the MVP pilot?",
    options: [
      "The interest rates offered were higher than traditional bank loans.",
      "The collateral documentation process was the main pain point.",
      "Loan approval times were too long, averaging five business days.",
      "The maximum loan size of $50,000 was insufficient for their needs."
    ],
    answerIdx: 1,
    explanation: "Câu trả lời đúng là B. Báo cáo nêu 'with the primary concern being the collateral documentation process' — quy trình nộp tài liệu tài sản thế chấp là điểm đau chính của merchant trong giai đoạn pilot.",
    sampleSentence: "Simplifying the collateral documentation process before the Q1 full rollout will address the primary merchant concern identified during the 60-day MVP pilot.",
    visualType: "invoice"
  },
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
    explanation: "3 từ khóa quan trọng:\n• Discrepancy (n): Sự sai lệch, không khớp số liệu.\n• Settlement report: Báo cáo quyết toán (nơi chốt dòng tiền).\n• Compliance team: Đội ngũ tuân thủ pháp lý."
  },
  {
    text: "Our overhead costs have fluctuated substantially during this quarter.",
    hint: "Chi phí cố định của chúng ta đã dao động đáng kể trong quý này.",
    explanation: "3 cụm quan trọng:\n• Overhead costs: Chi phí cố định (mặt bằng, điện nước, vận hành...).\n• Fluctuate (v): Biến động, dao động lên xuống.\n• Substantially (adv): Một cách đáng kể, mức độ lớn."
  },
  {
    text: "The chargeback rate exceeded our threshold, triggering an immediate reconciliation audit.",
    hint: "Tỷ lệ hoàn tiền tranh chấp vượt ngưỡng cho phép, kích hoạt kiểm toán đối soát khẩn cấp.",
    explanation: "3 từ quan trọng:\n• Chargeback rate: Tỷ lệ hoàn tiền khi khách tranh chấp với ngân hàng.\n• Threshold: Ngưỡng giới hạn (Visa/Mastercard quy định tối đa 1%).\n• Reconciliation audit: Kiểm toán đối soát — xem xét lại toàn bộ giao dịch."
  },
  {
    text: "We need a scalable architecture to handle throughput of fifty thousand transactions per second.",
    hint: "Chúng ta cần kiến trúc có thể mở rộng để xử lý công suất 50,000 giao dịch mỗi giây.",
    explanation: "Từ khóa kỹ thuật quan trọng:\n• Scalable architecture: Kiến trúc hệ thống có thể mở rộng khi nhu cầu tăng.\n• Throughput: Công suất xử lý — số giao dịch hoàn thành trong 1 giây (TPS).\n• Transactions per second (TPS): Đơn vị đo hiệu suất hệ thống thanh toán."
  },
  {
    text: "The acquisition requires thorough due diligence on the target company's liquidity and compliance status.",
    hint: "Việc thâu tóm yêu cầu thẩm định kỹ lưỡng về tình trạng thanh khoản và tuân thủ của công ty mục tiêu.",
    explanation: "Từ khóa M&A quan trọng:\n• Acquisition: Thâu tóm, mua lại — chữ A trong M&A.\n• Due diligence: Thẩm định toàn diện trước khi đầu tư/mua lại.\n• Liquidity: Khả năng chuyển đổi tài sản thành tiền mặt nhanh chóng."
  },
  {
    text: "Investors expect us to hit key milestones before the Series B funding round closes.",
    hint: "Nhà đầu tư kỳ vọng chúng ta đạt được các mốc quan trọng trước khi vòng gọi vốn Series B kết thúc.",
    explanation: "Startup/đầu tư từ vựng:\n• Milestone: Mốc quan trọng — mục tiêu cụ thể phải đạt (ví dụ: 1M users, break-even).\n• Series B: Vòng gọi vốn thứ 2 lớn, thường từ $10M–$50M.\n• Funding round: Vòng gọi vốn — Seed, Series A, B, C..."
  },
  {
    text: "Our burn rate this month reached $340,000, which is 70% above our planned budget.",
    hint: "Tốc độ đốt tiền tháng này đạt 340.000 đô la, cao hơn 70% so với ngân sách kế hoạch.",
    explanation: "Từ vựng startup quan trọng:\n• Burn rate: Số tiền công ty tiêu mỗi tháng trước khi có lợi nhuận — cao là dấu hiệu nguy hiểm.\n• Above budget: Vượt ngân sách — khi chi tiêu thực tế cao hơn kế hoạch.\n• Planned budget: Ngân sách kế hoạch — mức chi tiêu được phê duyệt trước."
  },
  {
    text: "The pivot from B2C to B2B lending reduced our churn rate from twenty-two percent to just four percent.",
    hint: "Việc chuyển hướng từ cho vay B2C sang B2B đã giảm tỷ lệ rời bỏ từ 22% xuống còn 4%.",
    explanation: "Ba khái niệm chiến lược cốt lõi:\n• Pivot: Chuyển hướng chiến lược căn bản khi model cũ không hiệu quả.\n• B2C/B2B: Business-to-Consumer và Business-to-Business — hai mô hình kinh doanh khác nhau.\n• Churn rate: Tỷ lệ khách hàng ngừng sử dụng dịch vụ — giảm churn là mục tiêu quan trọng."
  },
  {
    text: "All user card data is protected by tokenization, so no raw card numbers are stored on our servers.",
    hint: "Tất cả dữ liệu thẻ người dùng được bảo vệ bằng mã hóa token, vì vậy không có số thẻ thực nào được lưu trên máy chủ của chúng ta.",
    explanation: "Bảo mật thanh toán:\n• Tokenization: Thay thế dữ liệu thẻ thật bằng token vô nghĩa — tiêu chuẩn bảo mật PCI DSS.\n• Raw card numbers: Số thẻ thực — tuyệt đối không được lưu trữ trực tiếp.\n• Stored on servers: Lưu trữ trên máy chủ — nơi hacker nhắm đến khi tấn công."
  },
  {
    text: "The founding team's equity stake was diluted from fifty-two to thirty-eight percent after the Series B round.",
    hint: "Phần cổ phần của đội sáng lập bị pha loãng từ 52% xuống còn 38% sau vòng Series B.",
    explanation: "Thuật ngữ cổ phần startup:\n• Equity stake: Tỷ lệ cổ phần sở hữu trong công ty.\n• Diluted: Bị pha loãng — khi phát hành thêm cổ phần, tỷ lệ % của cổ đông cũ giảm xuống.\n• Series B round: Vòng gọi vốn lớn thứ hai — thường phát sinh dilution 15–25% cho cổ đông hiện tại."
  },
  {
    text: "We implemented a circuit breaker pattern to prevent any single microservice failure from causing a full system outage.",
    hint: "Chúng ta triển khai mô hình cầu dao ngắt mạch để ngăn bất kỳ lỗi microservice đơn lẻ nào gây ra sập toàn hệ thống.",
    explanation: "Kiến trúc phần mềm hiện đại:\n• Circuit breaker pattern: Mô hình thiết kế — ngắt kết nối với service lỗi để tránh lỗi lan rộng.\n• Microservice: Kiến trúc chia nhỏ ứng dụng thành các service độc lập.\n• System outage: Toàn hệ thống ngừng hoạt động — tình huống tệ nhất cần tránh bằng mọi giá."
  },
  {
    text: "Our AML system detected structuring behavior in seventy-three accounts and filed suspicious activity reports.",
    hint: "Hệ thống AML của chúng ta phát hiện hành vi chia nhỏ giao dịch ở 73 tài khoản và nộp báo cáo hoạt động đáng ngờ.",
    explanation: "Chống rửa tiền:\n• AML: Anti-Money Laundering — hệ thống phát hiện và ngăn chặn rửa tiền.\n• Structuring behavior: Hành vi chia nhỏ giao dịch cố ý để tránh ngưỡng báo cáo bắt buộc (thường $10,000).\n• Suspicious activity report (SAR): Báo cáo hoạt động đáng ngờ — phải nộp cho cơ quan quản lý khi phát hiện dấu hiệu rửa tiền."
  },
  {
    text: "The merchant conversion rate improved by sixteen percentage points after we simplified the KYC onboarding flow.",
    hint: "Tỷ lệ chuyển đổi merchant cải thiện 16 điểm phần trăm sau khi chúng ta đơn giản hóa quy trình KYC onboarding.",
    explanation: "Growth metrics:\n• Conversion rate: Tỷ lệ người dùng hoàn thành hành động mong muốn (đăng ký, mua hàng...).\n• Percentage points (pp): Điểm phần trăm — đơn vị đo sự thay đổi giữa hai tỷ lệ phần trăm.\n• KYC onboarding flow: Quy trình tiếp nhận khách hàng mới, bao gồm xác minh danh tính."
  },
  {
    text: "Funds deposited into the escrow account will be released only after both parties confirm successful delivery.",
    hint: "Tiền được nạp vào tài khoản ký quỹ sẽ chỉ được giải phóng sau khi cả hai bên xác nhận giao hàng thành công.",
    explanation: "Thanh toán B2B:\n• Escrow account: Tài khoản ký quỹ — tiền được giữ bởi bên thứ 3 trung lập.\n• Both parties: Cả hai bên — người mua và người bán cùng phải đồng ý.\n• Successful delivery: Giao hàng thành công — điều kiện để giải phóng tiền từ escrow."
  },
  {
    text: "The engineering team executed a rollback within eight minutes, restoring normal payment processing operations.",
    hint: "Đội kỹ thuật đã thực hiện hoàn tác triển khai trong vòng tám phút, khôi phục hoạt động xử lý thanh toán bình thường.",
    explanation: "DevOps và vận hành:\n• Rollback: Quay lại phiên bản phần mềm trước đó khi phiên bản mới gặp lỗi nghiêm trọng.\n• Within eight minutes: Trong vòng 8 phút — thời gian phản ứng nhanh, thường được đo trong SLA.\n• Restoring operations: Khôi phục hoạt động — mục tiêu chính sau khi xử lý incident."
  },
  {
    text: "Our KPI dashboard now shows real-time settlement data and chargeback trends for all merchant partners.",
    hint: "Bảng KPI của chúng ta hiện hiển thị dữ liệu quyết toán thời gian thực và xu hướng hoàn tiền tranh chấp cho tất cả đối tác merchant.",
    explanation: "Quản lý hiệu suất:\n• KPI dashboard: Bảng điều khiển chỉ số hiệu suất then chốt — hiển thị trực quan dữ liệu quan trọng.\n• Real-time: Thời gian thực — dữ liệu được cập nhật ngay lập tức, không có độ trễ.\n• Chargeback trends: Xu hướng hoàn tiền tranh chấp — dữ liệu quan trọng để phát hiện vấn đề sớm."
  },
  {
    text: "The sandbox environment has been upgraded to mirror production traffic volumes for more realistic integration testing.",
    hint: "Môi trường thử nghiệm đã được nâng cấp để phản ánh khối lượng traffic thực tế cho việc kiểm thử tích hợp thực tế hơn.",
    explanation: "Phát triển phần mềm:\n• Sandbox environment: Môi trường giả lập an toàn để kiểm thử mà không ảnh hưởng production.\n• Mirror production: Sao chép môi trường thực — giúp phát hiện lỗi trước khi go-live.\n• Integration testing: Kiểm thử tích hợp — đảm bảo các hệ thống hoạt động đúng khi kết nối với nhau."
  },
  {
    text: "After tightening underwriting risk score thresholds, new non-performing loan formation decreased by thirty-five percent.",
    hint: "Sau khi siết chặt ngưỡng điểm rủi ro bảo lãnh, việc hình thành khoản vay không hiệu quả mới đã giảm 35%.",
    explanation: "Quản lý rủi ro tín dụng:\n• Underwriting: Quy trình đánh giá và phê duyệt khoản vay — ai cho vay, cho vay bao nhiêu.\n• Risk score thresholds: Ngưỡng điểm rủi ro — điểm tối thiểu để được chấp thuận.\n• Non-performing loan (NPL): Khoản vay không hiệu quả — quá hạn và không được thanh toán đúng hạn."
  },
  {
    text: "Our OKRs for this quarter are directly aligned with the company-level goal of achieving product-market fit in Vietnam.",
    hint: "OKR của chúng ta trong quý này được căn chỉnh trực tiếp với mục tiêu cấp công ty là đạt được product-market fit tại Việt Nam.",
    explanation: "Quản lý mục tiêu:\n• OKRs: Objectives and Key Results — khung quản lý mục tiêu phổ biến (Google, Intel, Grab...).\n• Aligned with: Được căn chỉnh với — OKR cấp team phải hỗ trợ OKR cấp công ty.\n• Product-market fit: Sự phù hợp giữa sản phẩm và nhu cầu thị trường — mục tiêu sống còn của startup."
  },
  {
    text: "The vendor's SLA was breached this month, entitling us to a fifteen percent service credit on the monthly invoice.",
    hint: "SLA của nhà cung cấp đã bị vi phạm tháng này, cho phép chúng ta được hưởng tín dụng dịch vụ 15% trên hóa đơn hàng tháng.",
    explanation: "Quản lý nhà cung cấp:\n• SLA breach: Vi phạm thỏa thuận mức dịch vụ — khi nhà cung cấp không đáp ứng cam kết.\n• Entitling: Cho phép hưởng quyền lợi — khi một điều kiện được thỏa mãn.\n• Service credit: Tín dụng dịch vụ — khoản bồi thường được khấu trừ vào hóa đơn tiếp theo."
  },
  {
    text: "The company bootstrapped for two years before raising Series A, which helped maintain a clean cap table.",
    hint: "Công ty tự lực trong hai năm trước khi gọi vốn Series A, điều này giúp duy trì bảng phân bổ cổ phần gọn gàng.",
    explanation: "Chiến lược gọi vốn:\n• Bootstrapped: Tự tài trợ hoạt động mà không cần vốn bên ngoài — kiểm soát cao hơn.\n• Clean cap table: Bảng cổ phần đơn giản, ít nhà đầu tư — dễ giao dịch M&A và gọi vốn sau này.\n• Raising Series A: Gọi vốn vòng Series A — thường là vòng đầu tiên từ VC chuyên nghiệp."
  },
  {
    text: "The agile sprint retrospective revealed that backlog grooming sessions need to happen more frequently to reduce scope creep.",
    hint: "Buổi tổng kết sprint agile cho thấy các buổi backlog grooming cần diễn ra thường xuyên hơn để giảm thiểu mở rộng phạm vi.",
    explanation: "Phương pháp Agile:\n• Sprint retrospective: Buổi họp cuối sprint để rút kinh nghiệm — what went well, what to improve.\n• Backlog grooming: Sắp xếp và làm rõ các công việc trong backlog trước sprint.\n• Scope creep: Phạm vi công việc tăng dần không kiểm soát — kẻ thù của mọi dự án phần mềm."
  },
  {
    text: "Collateral coverage of one point four times provides adequate buffer against default risk in our lending portfolio.",
    hint: "Mức bảo đảm tài sản thế chấp 1,4 lần cung cấp đệm đủ để chống lại rủi ro vỡ nợ trong danh mục cho vay.",
    explanation: "Rủi ro tín dụng:\n• Collateral coverage: Tỷ lệ bảo đảm — giá trị tài sản thế chấp so với giá trị khoản vay.\n• Buffer against default risk: Đệm bảo vệ trước rủi ro vỡ nợ — dự phòng khi borrower không trả được.\n• Lending portfolio: Danh mục cho vay — tập hợp tất cả các khoản vay đang có."
  },
  {
    text: "Accrued interest on overdue loans is calculated daily and added to the outstanding balance until repayment is made.",
    hint: "Lãi tích lũy trên các khoản vay quá hạn được tính hàng ngày và cộng vào số dư còn lại cho đến khi thanh toán.",
    explanation: "Kế toán cho vay:\n• Accrued interest: Lãi tích lũy — lãi đã phát sinh nhưng chưa được thanh toán.\n• Overdue loans: Khoản vay quá hạn — không được thanh toán đúng hạn.\n• Outstanding balance: Số dư còn lại — tổng số tiền gốc và lãi chưa được thanh toán."
  },
  {
    text: "Expanding the syndicate to include two more partner banks allows us to scale the lending portfolio without additional capital.",
    hint: "Mở rộng tổ hợp thêm hai ngân hàng đối tác cho phép chúng ta mở rộng danh mục cho vay mà không cần thêm vốn.",
    explanation: "Cấu trúc tài chính:\n• Syndicate: Tổ hợp tài chính — nhiều tổ chức cùng tham gia vào một thương vụ.\n• Partner banks: Ngân hàng đối tác — các tổ chức tài chính đồng tham gia cho vay.\n• Scale without additional capital: Mở rộng mà không cần vốn thêm — lợi thế cạnh tranh quan trọng."
  },
  {
    text: "The go-live checklist must be signed off by engineering, compliance, and operations before we can deploy to production.",
    hint: "Danh sách kiểm tra go-live phải được phê duyệt bởi kỹ thuật, tuân thủ và vận hành trước khi chúng ta có thể triển khai lên production.",
    explanation: "Quản trị triển khai:\n• Go-live checklist: Danh sách kiểm tra trước khi ra mắt — đảm bảo không bỏ sót hạng mục quan trọng.\n• Sign off: Ký duyệt, phê chuẩn — xác nhận rằng phần trách nhiệm của mình đã hoàn tất.\n• Deploy to production: Đưa code lên môi trường thực — bước cuối cùng và quan trọng nhất."
  },
  {
    text: "The risk scoring model assigns a score between zero and one thousand to every incoming transaction in real time.",
    hint: "Mô hình điểm rủi ro gán điểm từ 0 đến 1.000 cho mỗi giao dịch đến trong thời gian thực.",
    explanation: "Hệ thống phát hiện gian lận:\n• Risk scoring model: Mô hình chấm điểm rủi ro — tự động đánh giá mức độ nguy hiểm của giao dịch.\n• Assigns a score: Gán điểm số — kết quả đầu ra của mô hình ML.\n• Real time: Thời gian thực — quyết định phải được đưa ra trong mili giây khi giao dịch đang xử lý."
  },
  {
    text: "Our FX hedging program protected three point two million dollars in revenue from exchange rate volatility this quarter.",
    hint: "Chương trình phòng ngừa rủi ro tỷ giá của chúng ta đã bảo vệ 3,2 triệu đô la doanh thu khỏi biến động tỷ giá trong quý này.",
    explanation: "Quản lý rủi ro tài chính:\n• FX hedging program: Chương trình phòng ngừa rủi ro ngoại hối — dùng công cụ tài chính để khóa tỷ giá.\n• Protected revenue: Bảo vệ doanh thu — giữ doanh thu không bị ảnh hưởng bởi biến động tỷ giá.\n• Exchange rate volatility: Biến động tỷ giá — rủi ro lớn với công ty có doanh thu bằng ngoại tệ."
  },
  {
    text: "The product backlog contains over two hundred items, so regular grooming sessions are essential to maintain focus.",
    hint: "Danh sách công việc tồn đọng chứa hơn 200 hạng mục, vì vậy các buổi sắp xếp định kỳ rất cần thiết để duy trì sự tập trung.",
    explanation: "Quản lý sản phẩm Agile:\n• Product backlog: Danh sách tất cả công việc cần làm cho sản phẩm — sắp xếp theo độ ưu tiên.\n• Over two hundred items: Hơn 200 hạng mục — backlog lớn cần được quản lý chặt chẽ.\n• Regular grooming sessions: Buổi rà soát định kỳ — làm rõ, ước tính và sắp xếp lại ưu tiên backlog."
  },
  {
    text: "The momentum from our viral referral campaign drove a three hundred percent increase in new user sign-ups last month.",
    hint: "Đà phát triển từ chiến dịch giới thiệu lan truyền đã tạo ra mức tăng 300% trong số lượng người dùng mới đăng ký tháng trước.",
    explanation: "Tăng trưởng và marketing:\n• Momentum: Đà tăng trưởng — khi sản phẩm đang tăng trưởng nhanh và mạnh như một quả bóng lăn.\n• Viral referral campaign: Chiến dịch giới thiệu lan truyền — khách hàng cũ mời khách hàng mới.\n• Three hundred percent increase: Tăng 300% — mức tăng trưởng ấn tượng cần duy trì đà."
  },
  {
    text: "Perpetual bonds offer capital without diluting equity, but the coupon obligation continues indefinitely.",
    hint: "Trái phiếu vĩnh viễn cung cấp vốn mà không pha loãng cổ phần, nhưng nghĩa vụ trả lãi kéo dài vô thời hạn.",
    explanation: "Công cụ tài chính:\n• Perpetual bonds: Trái phiếu vĩnh viễn — không có ngày đáo hạn, trả lãi mãi mãi.\n• Without diluting equity: Không pha loãng cổ phần — lợi thế so với phát hành cổ phiếu mới.\n• Coupon obligation: Nghĩa vụ trả lãi coupon — khoản thanh toán định kỳ cho người nắm giữ trái phiếu."
  },
  {
    text: "Attrition in the sales team reached twenty percent this year, significantly impacting our revenue conversion pipeline.",
    hint: "Tỷ lệ nghỉ việc trong đội sales đạt 20% năm nay, ảnh hưởng đáng kể đến phễu chuyển đổi doanh thu.",
    explanation: "Quản lý nhân sự:\n• Attrition: Tỷ lệ nhân viên rời công ty tự nguyện — chỉ số sức khỏe nhân sự quan trọng.\n• Sales team: Đội kinh doanh — những người trực tiếp tạo ra doanh thu.\n• Revenue conversion pipeline: Phễu chuyển đổi doanh thu — từ lead đến deal đã ký."
  },
  {
    text: "Our iterative approach to product development means we ship improvements every two weeks based on user feedback.",
    hint: "Cách tiếp cận cải tiến liên tục trong phát triển sản phẩm của chúng ta có nghĩa là chúng ta ra mắt cải tiến mỗi hai tuần dựa trên phản hồi người dùng.",
    explanation: "Phương pháp phát triển sản phẩm:\n• Iterative approach: Phương pháp lặp lại — liên tục cải thiện qua nhiều vòng nhỏ thay vì một lần lớn.\n• Ship improvements: Ra mắt cải tiến — đưa tính năng mới hoặc sửa lỗi vào tay người dùng.\n• User feedback: Phản hồi người dùng — dữ liệu quan trọng nhất để quyết định cải tiến gì tiếp theo."
  },
  {
    text: "The arbitrage opportunity between two payment networks allowed merchants to reduce processing fees by up to forty percent.",
    hint: "Cơ hội kinh doanh chênh lệch giá giữa hai mạng thanh toán cho phép merchant giảm phí xử lý lên đến 40%.",
    explanation: "Kinh tế học thanh toán:\n• Arbitrage opportunity: Cơ hội kinh doanh chênh lệch — khai thác sự khác biệt giá giữa các thị trường.\n• Payment networks: Mạng thanh toán — Visa, Mastercard, JCB, UnionPay...\n• Processing fees: Phí xử lý giao dịch — chi phí mà merchant phải trả mỗi khi có giao dịch."
  },
  {
    text: "Headcount planning for next year must balance growth ambitions with the need to control our burn rate.",
    hint: "Kế hoạch nhân sự cho năm tới phải cân bằng giữa tham vọng tăng trưởng và nhu cầu kiểm soát tốc độ đốt tiền.",
    explanation: "Quản lý nguồn lực:\n• Headcount planning: Lập kế hoạch nhân sự — quyết định tuyển bao nhiêu người và vào thời điểm nào.\n• Growth ambitions: Tham vọng tăng trưởng — mục tiêu mở rộng về doanh thu, người dùng, thị trường.\n• Control burn rate: Kiểm soát tốc độ tiêu tiền — cân bằng giữa đầu tư tăng trưởng và bền vững tài chính."
  },
  {
    text: "The new deployment pipeline reduced our average release cycle from four weeks to just three days.",
    hint: "Pipeline triển khai mới đã rút ngắn chu kỳ phát hành trung bình từ bốn tuần xuống còn ba ngày.",
    explanation: "Kỹ thuật phần mềm:\n• Deployment pipeline: Quy trình tự động từ code đến production — build, test, deploy.\n• Release cycle: Chu kỳ phát hành — khoảng thời gian giữa các lần ra mắt phiên bản mới.\n• From four weeks to three days: Từ bốn tuần xuống ba ngày — cải tiến tốc độ đáng kể nhờ automation."
  },
  {
    text: "Partnership with the national payment switch requires our system to maintain latency below one hundred milliseconds.",
    hint: "Quan hệ đối tác với hệ thống thanh toán quốc gia yêu cầu hệ thống của chúng ta duy trì độ trễ dưới 100 mili giây.",
    explanation: "Kỹ thuật và partnership:\n• National payment switch: Hệ thống thanh toán quốc gia — cơ sở hạ tầng thanh toán trung tâm của một quốc gia.\n• Maintain latency below: Duy trì độ trễ dưới — cam kết hiệu suất kỹ thuật bắt buộc.\n• One hundred milliseconds: 100ms — ngưỡng độ trễ thông thường cho hệ thống thanh toán real-time."
  },
  {
    text: "A strong retention strategy is more cost-effective than acquiring new customers, especially in a competitive fintech market.",
    hint: "Chiến lược giữ chân khách hàng mạnh mẽ hiệu quả về chi phí hơn việc thu hút khách hàng mới, đặc biệt trong thị trường fintech cạnh tranh.",
    explanation: "Chiến lược tăng trưởng:\n• Retention strategy: Chiến lược giữ chân khách hàng — giữ user hiện tại thường rẻ hơn 5-7 lần so với tìm user mới.\n• Cost-effective: Hiệu quả về chi phí — đạt kết quả tốt với chi phí thấp hơn.\n• Competitive fintech market: Thị trường fintech cạnh tranh — nơi chi phí mua khách (CAC) ngày càng tăng."
  },
  {
    text: "The underwriting team will not approve any loan application with a risk score below five hundred under the new policy.",
    hint: "Đội bảo lãnh sẽ không phê duyệt bất kỳ đơn vay nào có điểm rủi ro dưới 500 theo chính sách mới.",
    explanation: "Chính sách tín dụng:\n• Underwriting team: Đội bảo lãnh tín dụng — người quyết định có cho vay hay không và với điều kiện gì.\n• Approve loan application: Phê duyệt đơn vay — quyết định cho phép giải ngân.\n• Risk score below five hundred: Điểm rủi ro dưới 500 — ngưỡng phân loại khách hàng rủi ro cao."
  },
  {
    text: "Benchmarking our chargeback rates against industry standards helps us identify improvement opportunities proactively.",
    hint: "So sánh tỷ lệ hoàn tiền tranh chấp của chúng ta với tiêu chuẩn ngành giúp chúng ta chủ động xác định cơ hội cải thiện.",
    explanation: "Phân tích hiệu suất:\n• Benchmarking: So sánh với tiêu chuẩn — đối chiếu hiệu suất với đối thủ hoặc chuẩn ngành.\n• Chargeback rates: Tỷ lệ hoàn tiền tranh chấp — chỉ số sức khỏe thanh toán quan trọng.\n• Proactively: Một cách chủ động — hành động trước khi vấn đề trở nên nghiêm trọng."
  },
  {
    text: "All accounts flagged by the AML system are placed on a temporary blacklist pending a manual compliance review.",
    hint: "Tất cả tài khoản bị hệ thống AML gắn cờ sẽ được đưa vào danh sách đen tạm thời chờ xem xét tuân thủ thủ công.",
    explanation: "Quy trình AML:\n• Flagged by the AML system: Bị hệ thống AML gắn cờ — được đánh dấu để xem xét thêm.\n• Temporary blacklist: Danh sách đen tạm thời — bị hạn chế giao dịch cho đến khi được làm rõ.\n• Manual compliance review: Xem xét tuân thủ thủ công — con người xem xét trường hợp mà AI không đủ tự tin."
  },
  {
    text: "The MVP launch allowed us to validate product-market fit with real users before committing to full development.",
    hint: "Việc ra mắt MVP cho phép chúng ta xác nhận sự phù hợp với thị trường với người dùng thực trước khi cam kết phát triển đầy đủ.",
    explanation: "Phát triển sản phẩm:\n• MVP launch: Ra mắt sản phẩm khả dụng tối thiểu — phiên bản đơn giản nhất để test ý tưởng.\n• Validate product-market fit: Xác nhận sự phù hợp với thị trường — kiểm chứng xem người dùng có thực sự cần sản phẩm không.\n• Committing to full development: Cam kết phát triển đầy đủ — đầu tư lớn hơn sau khi đã có bằng chứng."
  },
  {
    text: "Our scalable microservice architecture supports automatic horizontal scaling during transaction volume peaks.",
    hint: "Kiến trúc microservice có thể mở rộng của chúng ta hỗ trợ mở rộng ngang tự động trong các đợt cao điểm khối lượng giao dịch.",
    explanation: "Kiến trúc cloud:\n• Scalable microservice architecture: Kiến trúc vi dịch vụ có thể mở rộng — nền tảng của mọi fintech hiện đại.\n• Automatic horizontal scaling: Tự động mở rộng ngang — thêm server khi traffic tăng, giảm khi traffic giảm.\n• Transaction volume peaks: Đỉnh khối lượng giao dịch — giờ cao điểm khi hệ thống phải xử lý nhiều nhất."
  },
  {
    text: "Negotiating payment terms with suppliers can improve cash flow by extending payables without damaging relationships.",
    hint: "Đàm phán điều khoản thanh toán với nhà cung cấp có thể cải thiện dòng tiền bằng cách kéo dài khoản phải trả mà không làm tổn hại đến mối quan hệ.",
    explanation: "Quản lý dòng tiền:\n• Negotiating payment terms: Đàm phán điều khoản thanh toán — khi nào và bao nhiêu phải trả.\n• Improve cash flow: Cải thiện dòng tiền — giữ tiền mặt trong công ty lâu hơn.\n• Extending payables: Kéo dài khoản phải trả — thanh toán muộn hơn cho supplier."
  },
  {
    text: "The embedded lending MVP generated 1.8 million dollars in loan originations with an NPL rate well below our risk appetite.",
    hint: "MVP cho vay tích hợp tạo ra 1,8 triệu đô la giải ngân với tỷ lệ nợ xấu thấp hơn nhiều so với khẩu vị rủi ro của chúng ta.",
    explanation: "Fintech lending:\n• Embedded lending MVP: Tính năng cho vay nhúng ở giai đoạn thử nghiệm tối thiểu — tích hợp vào sản phẩm chính.\n• Loan originations: Tổng giá trị khoản vay được giải ngân — chỉ số quan trọng của business lending.\n• NPL rate: Tỷ lệ nợ xấu — khoản vay không được trả đúng hạn, cần giữ dưới ngưỡng risk appetite."
  },
  {
    text: "Encryption key rotation must be completed by November 30th to maintain PCI DSS compliance across all payment integrations.",
    hint: "Việc xoay khóa mã hóa phải được hoàn thành trước ngày 30/11 để duy trì tuân thủ PCI DSS trên tất cả tích hợp thanh toán.",
    explanation: "Bảo mật và tuân thủ:\n• Encryption key rotation: Xoay khóa mã hóa — thay thế khóa cũ bằng khóa mới theo lịch định kỳ.\n• PCI DSS compliance: Tuân thủ tiêu chuẩn bảo mật dữ liệu thẻ thanh toán — bắt buộc cho mọi fintech.\n• Payment integrations: Các tích hợp thanh toán — mọi kết nối với hệ thống bên ngoài xử lý dữ liệu thẻ."
  },
  {
    text: "The three-month runway extension from cost optimization gives us enough time to close the Series B funding round.",
    hint: "Việc gia hạn ba tháng từ tối ưu chi phí cho chúng ta đủ thời gian để hoàn tất vòng gọi vốn Series B.",
    explanation: "Quản lý tài chính startup:\n• Runway extension: Gia hạn thời gian tồn tại — kéo dài số tháng công ty còn tiền hoạt động.\n• Cost optimization: Tối ưu chi phí — giảm burn rate mà không ảnh hưởng velocity sản phẩm.\n• Close the Series B: Hoàn tất vòng Series B — ký kết và nhận tiền từ nhà đầu tư."
  },
  {
    text: "Benchmarking our API latency against the ASEAN peer group shows we need to close a gap of seventy-seven milliseconds.",
    hint: "So sánh độ trễ API của chúng ta với nhóm đồng nghiệp ASEAN cho thấy chúng ta cần thu hẹp khoảng cách 77 mili giây.",
    explanation: "Hiệu suất kỹ thuật:\n• Benchmarking: So sánh hiệu suất — đối chiếu với đối thủ hoặc chuẩn ngành.\n• API latency: Độ trễ API — thời gian hệ thống phản hồi một yêu cầu.\n• Close a gap: Thu hẹp khoảng cách — cải thiện để đạt mức của đối thủ tốt nhất."
  },
  {
    text: "The syndicate lending program allows us to originate one hundred million dollars in SME loans without proportional capital increases.",
    hint: "Chương trình cho vay tổ hợp cho phép chúng ta giải ngân 100 triệu đô la khoản vay SME mà không cần tăng vốn tương ứng.",
    explanation: "Cấu trúc tài chính:\n• Syndicate lending program: Chương trình cho vay tổ hợp — nhiều tổ chức cùng tài trợ một danh mục.\n• Originate loans: Giải ngân khoản vay — thực hiện cho vay ban đầu trước khi có thể bán/syndicate.\n• Without proportional capital increases: Không cần tăng vốn tương ứng — mô hình capital-light cho phép scale nhanh."
  },
  {
    text: "Our cap table has been restructured to include an expanded employee stock option pool ahead of the Series B close.",
    hint: "Bảng phân bổ cổ phần của chúng ta đã được cơ cấu lại để bao gồm quỹ quyền chọn cổ phiếu nhân viên mở rộng trước khi vòng Series B hoàn tất.",
    explanation: "Cổ phần và đầu tư:\n• Cap table restructured: Bảng cổ phần được cơ cấu lại — điều chỉnh tỷ lệ sở hữu của các bên.\n• Employee stock option pool (ESOP): Quỹ quyền chọn cổ phiếu cho nhân viên — công cụ thu hút và giữ chân nhân tài.\n• Ahead of the Series B close: Trước khi vòng Series B hoàn tất — thường phải cơ cấu lại cap table trước khi nhà đầu tư mới vào."
  },
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

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  function handleRandomModule() {
    const modules = ['vocab', 'listen', 'speak', 'read', 'write'];
    const random = modules[Math.floor(Math.random() * modules.length)];
    setActiveModule(random);
    showToast(`Đã chuyển sang ngẫu nhiên: ${random.toUpperCase()}`);
  }

  function playAudio(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    } else {
      showToast("Trình duyệt không hỗ trợ phát âm.");
    }
  }

  function formatAIResponse(text) {
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
  }

  function handleParseVocab() {
    const parsed = parseVocabPaste(addVocabText);
    if (parsed.length === 0) {
      showToast("Không tìm thấy từ nào. Kiểm tra format có IPA /.../ không?");
    }
    setParsedPreview(parsed);
  }

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

  function generateQuiz() {
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
  }

  useEffect(() => {
    if (activeModule === 'vocab' && vocabMode === 'quiz') generateQuiz();
  }, [cardIdx, activeModule, vocabMode]);

  function handleQuizAnswer(selected) {
    if (quizAnswered) return;
    setQuizAnswered(selected);
    if (selected === allVocab[cardIdx].word) {
      setQuizScore(prev => prev + 1);
    }
  }

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

  function speakAndAdvance(idx) {
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
  }

  function handleRunPlay() {
    if (runFinished) {
      runIdxRef.current = 0;
      setRunIdx(0);
      setRunSeconds(0);
      setRunFinished(false);
    }
    setRunPlaying(true);
    runTimerRef.current = setInterval(() => setRunSeconds(s => s + 1), 1000);
    speakAndAdvance(runIdxRef.current);
  }

  function handleRunPause() {
    setRunPlaying(false);
    window.speechSynthesis.cancel();
    clearTimeout(runSpeakTimeoutRef.current);
    clearInterval(runTimerRef.current);
  }

  function handleRunSkip() {
    window.speechSynthesis.cancel();
    clearTimeout(runSpeakTimeoutRef.current);
    const next = runIdxRef.current + 1;
    runIdxRef.current = next;
    setRunIdx(next);
    if (runPlaying) speakAndAdvance(next);
  }

  function handleRunStop() {
    window.speechSynthesis.cancel();
    clearTimeout(runSpeakTimeoutRef.current);
    clearInterval(runTimerRef.current);
    setRunPlaying(false);
    runIdxRef.current = 0;
    setRunIdx(0);
    setRunSeconds(0);
    setRunFinished(false);
  }

  useEffect(() => { allRunningPlaylistRef.current = allRunningPlaylist; }, [allRunningPlaylist]);
  useEffect(() => { localStorage.setItem('lastListenIdx', listenIdx); }, [listenIdx]);

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
  useEffect(() => { localStorage.setItem('lastReadIdx', readIdx); }, [readIdx]);

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
  useEffect(() => { localStorage.setItem('lastSpeakIdx', speakIdx); }, [speakIdx]);
  const [speakTranscript, setSpeakTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingGrading, setIsSpeakingGrading] = useState(false);
  const [speakFeedback, setSpeakFeedback] = useState(null);
  const recognitionRef = useRef(null);

  function toggleRecording() {
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
  }

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
  useEffect(() => { localStorage.setItem('lastWriteIdx', writeIdx); }, [writeIdx]);
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
  function renderVocab() {
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
  }

  // ── Render: Listen ──
  function renderListen() {
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
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 pb-2">
            <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm text-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
              <button onClick={() => playAudio(allListeningData[listenIdx].text)} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full p-3 inline-flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-amber-500/30 mb-2">
                <IconPlay />
              </button>
              <p className="text-gray-600 font-medium text-xs mb-1.5">Bấm Play, nghe câu nói của đối tác và gõ lại chính xác nội dung.</p>
              <p className="text-[11px] text-gray-500 italic bg-amber-50 inline-block px-3 py-1.5 rounded-full border border-amber-100">Hint: {allListeningData[listenIdx].hint}</p>
            </div>

            <textarea
              value={listenInput} onChange={(e) => setListenInput(e.target.value)}
              className="w-full min-h-[80px] bg-white border border-gray-200 rounded-2xl p-3 text-gray-900 text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none shadow-inner shrink-0"
              placeholder="Type exactly what you hear here..."
            />

            {showListenAnswer && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-3 animate-fade-in shadow-sm relative shrink-0">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <div className="flex justify-between items-center mb-1.5">
                  <p className="text-green-700 font-bold text-xs uppercase tracking-wide">Đáp án:</p>
                  <button onClick={() => playAudio(allListeningData[listenIdx].text)} className="text-green-700 hover:text-green-900"><IconPlay /></button>
                </div>
                <p className="text-gray-900 text-sm font-medium mb-2">{allListeningData[listenIdx].text}</p>
                <div className="bg-white rounded-xl p-2.5 border border-green-100 shadow-sm">
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
          </div>

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
  }

  // ── Render: Read ──
  function renderRead() {
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
  }

  // ── Render: Speak ──
  function renderSpeak() {
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

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 pb-1">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 shrink-0">
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

        <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm shrink-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">🎙️ Thu âm phản hồi</span>
            <button onClick={toggleRecording} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-bold transition-all shadow-md ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-900'}`}>
              <IconMicOutline /> {isRecording ? "Đang thu âm..." : "Bấm để Nói"}
            </button>
          </div>
          <textarea
            value={speakTranscript} onChange={(e) => setSpeakTranscript(e.target.value)}
            className={`w-full min-h-[100px] bg-gray-50 border p-3 rounded-2xl text-gray-900 text-sm resize-none outline-none transition-colors ${isRecording ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 focus:border-rose-400'}`}
            placeholder="Nhấn nút Micro và nói tiếng Anh, hoặc anh có thể gõ trực tiếp..."
          />
          <div className="mt-3 flex justify-between items-center">
            <button onClick={() => { setSpeakIdx(prev => (prev + 1) % speakingData.length); setSpeakTranscript(''); setSpeakFeedback(null); }} className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg">Đổi tình huống</button>
            <button onClick={handleGradeSpeaking} disabled={isSpeakingGrading || isRecording} className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 shadow-md transition-colors ${isSpeakingGrading || isRecording ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}>
              {isSpeakingGrading ? <IconLoading /> : <IconSparkles />} Gửi AI Đánh Giá
            </button>
          </div>
        </div>

        {speakFeedback && (
          <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-200 rounded-3xl p-4 shadow-md animate-fade-in relative overflow-hidden shrink-0">
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
    </div>
    );
  }

  // ── Render: Write ──
  function renderWrite() {
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

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 pb-1">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 shrink-0">
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

        <div className="flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden shrink-0">
          <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">✍️ Khung soạn thảo</span>
          </div>
          <textarea
            value={writeInput} onChange={(e) => setWriteInput(e.target.value)}
            disabled={isGrading}
            className="w-full min-h-[120px] bg-transparent p-3 text-gray-900 text-sm resize-none outline-none"
            placeholder="Gõ bản nháp tiếng Anh của anh vào đây..."
          />
          <div className="p-3 bg-gray-50 border-t border-gray-200 flex flex-row justify-between items-center gap-4">
            <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border border-gray-200">{writeInput.length} chars</span>
            <button onClick={handleGradeWriting} disabled={isGrading} className={`text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm shadow-md flex items-center gap-1.5 ${isGrading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'}`}>
              {isGrading ? <IconLoading /> : <IconSparkles />}
              {isGrading ? "Đang đọc..." : "Gửi AI Chấm"}
            </button>
          </div>
        </div>

        {writeFeedback && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-lg text-gray-300 animate-fade-in relative overflow-hidden shrink-0">
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
    </div>
    );
  }

  function NavItem({ module, icon, label, activeColorClass }) {
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
  }

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
