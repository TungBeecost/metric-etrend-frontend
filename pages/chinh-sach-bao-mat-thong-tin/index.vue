<template>
  <TermAndPolicy :banner="{ type: 'GuardDocument', title: 'CHÍNH SÁCH BẢO MẬT THÔNG TIN' }">
    <template #detail>
      <div class="detail">
        <div class="summary">
          Metric eReport là nền tảng cung cấp báo cáo thị trường cho những người có nhu cầu đăng ký sử dụng dịch vụ.
          Chính sách này mô tả thông tin mà chúng tôi xử lý để hỗ trợ nhằm nâng cao chất lượng sản phẩm cũng như đảm
          bảo dịch vụ được cung cấp một cách tối ưu nhất cho bạn và những người khác. Để cung cấp Sản phẩm của Metric,
          chúng tôi phải xử lý các thông tin bạn cung cấp hoặc chia sẻ. Các loại thông tin mà chúng tôi xử lý phụ thuộc
          vào cách bạn sử dụng sản phẩm của chúng tôi.
        </div>
        <div class="clause">
          <div class="header">
            <div class="mark" />
            <div class="label">Mục đích và phạm vi thu thập thông tin</div>
          </div>

          <ul class="statement">
            Metric thu thập các thông tin sau của người sử dụng dịch vụ:
            <li>
              <b>Thông tin và nội dung bạn cung cấp:</b> Chúng tôi thu thập nội dung, thông tin liên lạc và các thông
              tin khác mà bạn cung cấp khi sử dụng sản phẩm của chúng tôi, bao gồm cả khi bạn đăng ký một tài khoản,
              tạo hoặc chia sẻ nội dung và nhắn tin hay liên lạc với người khác bằng các nền tảng mà chúng tôi cung cấp.
              Thông tin này cũng có thể bao gồm nội dung bạn nhìn thấy thông qua các tính năng chúng tôi cung cấp.
            </li>
            <li>
              <b>Mạng và kết nối:</b> Chúng tôi thu thập thông tin về những người, trang, tài khoản, hashtag và nhóm mà
              bạn kết nối cũng như cách bạn tương tác với họ trên các Sản phẩm của chúng tôi. Ngoài ra, chúng tôi còn thu
              thập thông tin liên hệ nếu bạn thực hiện tải lên thông tin của bạn (chẳng hạn như số địa chỉ, nhật ký cuộc
              gọi hoặc nhật ký SMS).
            </li>
            <li>
              <b>Lưu trữ dữ liệu bạn hoặc khách hàng của bạn chia sẻ:</b> Trong một số trường hợp, nhằm cung cấp đầy đủ
              dịch vụ của mình, chúng tôi có thể cần lưu trữ dữ liệu của bạn hoặc khách hàng của bạn đã cung cấp qua hệ
              thống ereport.metric.vn. Ví dụ như dữ liệu về số điện thoại khách hàng đã để lại trong tin nhắn trên trang
              của bạn sẽ được lưu về hệ thống Quản lý khách hàng của bạn trên hệ thống ereport.metric.vn.
            </li>
            <li>
              <b>Thông tin về thiết bị:</b> Chúng tôi thu thập thông tin từ và về máy tính, điện thoại được kết nối cũng
              như các thiết bị kết nối web khác mà bạn dùng để tích hợp Sản phẩm của chúng tôi. Chúng tôi cũng kết hợp
              thông tin này trên các thiết bị khác nhau mà bạn sử dụng. Ví dụ: chúng tôi sử dụng thông tin thu thập được
              về cách bạn dùng Sản phẩm của chúng tôi trên điện thoại để cá nhân hóa tốt hơn nội dung hoặc tính năng bạn
              thấy khi sử dụng Sản phẩm của chúng tôi trên một thiết bị khác, chẳng hạn như máy tính xách tay, máy tính
              bảng, hoặc để đo lường xem liệu bạn có thực hiện các tính năng chúng tôi cung cấp trên các thiết bị di động
              hay không. Thông tin chúng tôi thu được từ các thiết bị này bao gồm:
            </li>
            <li>
              <b>Các thuộc tính thiết bị:</b> Những thông tin như hệ điều hành, phiên bản phần cứng và phần mềm, mức
              pin, cường độ tín hiệu, dung lượng bộ nhớ trống, plugin, loại trình duyệt, tên cũng như loại của tệp và
              ứng dụng.
            </li>
            <li>
              <b>Hoạt động trên thiết bị:</b> Thông tin về các hoạt động và hành vi được thực hiện trên thiết bị, chẳng
              hạn như liệu một cửa sổ ở nền trước hay nền sau hoặc các hoạt động của chuột (thông tin này có thể giúp
              phân biệt người thật với các bot).
            </li>
            <li>
              <b>Số nhận dạng:</b> Số nhận dạng duy nhất, ID thiết bị và các số nhận dạng khác, chẳng hạn như từ trò
              chơi, ứng dụng hoặc tài khoản bạn dùng, cũng như ID thiết bị gia đình. Tín hiệu thiết bị: Tín hiệu
              Bluetooth và thông tin về các cột phát sóng, đèn hiệu và điểm truy cập Wifi ở gần.
            </li>
            <li>
              <b>Dữ liệu từ cài đặt thiết bị:</b> thông tin bạn cho phép chúng tôi nhận thông qua cài đặt thiết bị mà
              bạn bật, chẳng hạn như quyền truy cập vào vị trí GPS, máy ảnh hoặc ảnh của bạn.</li>
            <li>
              <b>Dữ liệu từ cài đặt thiết bị:</b> thông tin bạn cho phép chúng tôi nhận thông qua cài đặt thiết bị mà
              bạn bật, chẳng hạn như quyền truy cập vào vị trí GPS,
              máy ảnh hoặc ảnh của bạn.
            </li>
            <li>
              <b>Mạng và kết nối:</b> thông tin như tên của nhà mạng di động hoặc ISP, ngôn ngữ, múi giờ, số điện thoại
              di động, địa chỉ IP, tốc độ kết nối.</li>
            <li>
              <b>Dữ liệu cookie:</b> Dữ liệu từ các cookie được lưu trữ trên thiết bị của bạn, bao gồm cả cài đặt và ID
              cookie. Hãy tìm hiểu thêm về cách chúng tôi sử dụng cookie trong Chính sách cookie của website.
            </li>
            <li>
              <b>Thông tin từ đối tác:</b>Nhà quảng cáo, nhà phát triển ứng dụng và nhà phát hành có thể gửi thông tin
              cho chúng tôi qua Công cụ kinh doanh trên ereport.metric.vn mà họ sử dụng.
            </li>
          </ul>

          <ul class="statement">
            Đây là các thông tin mà ereport.vn cần thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và chúng tôi sử dụng thông tin mình có như mô tả bên
            dưới. Đồng thời, chúng tôi sử dụng những thông tin này để cung cấp và hỗ trợ Sản phẩm của ereport.vn và các dịch vụ có liên quan như mô tả trong Điều
            khoản dịch vụ của ereport.vn:
            <li>
              <b>Cung cấp, cá nhân hóa và cải tiến Sản phẩm:</b> Thông tin trên khắp các thiết bị và Sản phẩm của ereport.vn: Chúng tôi kết nối thông tin về hoạt
              động của bạn trên những thiết bị và Sản phẩm khác nhau của ereport.vn để mang lại trải nghiệm nhất quán và phù hợp hơn trên tất cả các Sản phẩm của
              ereport.vn mà bạn sử dụng, bất kể nơi bạn sử dụng. Ví dụ: chúng tôi cố gắng mang lại cho bạn trải nghiệm liền mạch hơn, chẳng hạn như bằng cách tự động
              điền thông tin đăng ký của bạn (như số điện thoại của bạn) từ một Sản phẩm của ereport.vn khi bạn đăng ký tài khoản trên một Sản phẩm khác.
            </li>
            <li>
              <b>Nghiên cứu và phát triển sản phẩm:</b> Chúng tôi sử dụng thông tin mình có để phát triển, thử nghiệm và cải thiện Sản phẩm, chẳng hạn như bằng cách tiến
              hành khảo sát và nghiên cứu, cũng như thử nghiệm và khắc phục sự cố các tính năng, sản phẩm mới.
            </li>
            <li>
              <b>Cung cấp dịch vụ đo lường, phân tích và các dịch vụ kinh doanh khác:</b> Chúng tôi sử dụng thông tin mình có để giúp bạn, đồng nghiệp của bạn hoặc các đối
              tác của chúng tôi có thể đo lường, phân tích và đưa ra các tính hỗ trợ cho bạn trong suốt quá trình sử dụng sản phẩm. Việc này hoàn toàn nằm trong cài đặt của
              bạn. Bất cứ lúc nào dù không vì lý do gì bạn đều có thể tắt hoặc ngắt kết nối với các tính năng này trong hệ thống.
            </li>
            <li>
              <b>Cải thiện độ an toàn, tính toàn vẹn và bảo mật:</b> Chúng tôi sử dụng thông tin mình có để xác minh tài khoản và hoạt động, chống hành vi có hại, phát hiện
              và ngăn chặn spam cũng như các trải nghiệm tiêu cực khác, duy trì tính toàn vẹn của Sản phẩm, đồng thời cải thiện độ an toàn và tính bảo mật trên và ngoài Sản
              phẩm của ereport.vn. Ví dụ: chúng tôi sử dụng dữ liệu mình có để điều tra hoạt động đáng ngờ hoặc các hành vi vi phạm chính sách hoặc điều khoản của
              chúng tôi hoặc phát hiện khi một người nào đó cần trợ giúp.
            </li>
            <li>
              <b>Liên lạc với bạn:</b> Chúng tôi sử dụng thông tin mình có để gửi cho bạn các thông tin tiếp thị, thông báo cho bạn về Sản phẩm của chúng tôi, cũng như cho
              bạn biết về các chính sách và điều khoản của chúng tôi. Chúng tôi cũng sử dụng thông tin của bạn để trả lời bạn khi bạn liên hệ với chúng tôi.
            </li>
            <li>
              <b>Nghiên cứu và đổi mới vì cộng đồng:</b> Chúng tôi sử dụng thông tin mình có (bao gồm thông tin từ các đối tác nghiên cứu cộng tác với chúng tôi) để tiến
              hành và hỗ trợ cho sự phát triển chung của cộng đồng, xã hội, đặc biệt là cộng đồng những người đang sử dụng sản phẩm của ereport.vn.
            </li>
          </ul>

          <div style="font-size: 16px; margin-bottom: 0">
            Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình. Ngoài ra,
            thành viên có trách nhiệm thông báo kịp thời cho ereport.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật
            khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
          </div>

          <div class="header">
            <div class="mark" />
            <div class="label">Phạm vi sử dụng thông tin và những người hoặc tổ chức có thể tiếp cận được với thông tin cá nhân của khách hàng</div>
          </div>

          <ul class="statement">
            <li>
              Khi bạn chia sẻ và liên lạc bằng Sản phẩm của chúng tôi, bạn chọn đối tượng cho nội dung mình chia sẻ. Ví dụ: khi bạn gửi tin nhắn bằng ereport.vn, bạn
              chọn người sẽ nhận được tin nhắn đó. Mạng của bạn cũng có thể thấy những hành động bạn đã thực hiện trên Sản phẩm của chúng tôi...
            </li>
            <li>Nội dung người khác chia sẻ hoặc chia sẻ lại về bạn;</li>
            <li>
              Bạn nên cân nhắc người mà bạn chọn chia sẻ, vì những người có thể xem hoạt động của bạn trên Sản phẩm của chúng tôi có thể chọn chia sẻ hoạt động đó với người
              khác trên và ngoài Sản phẩm của chúng tôi, bao gồm cả với những người và doanh nghiệp không thuộc đối tượng chia sẻ của bạn. Ví dụ: khi bạn chia sẻ bài viết
              hoặc gửi tin nhắn cho những tài khoản cụ thể, họ có thể tải xuống, chụp ảnh màn hình hoặc chia sẻ lại nội dung đó với người khác trên hoặc ngoài Sản phẩm của
              chúng tôi. Ngoài ra, khi bạn trả lời một bình luận của người khác hoặc bày tỏ cảm xúc về nội dung của họ, bình luận hoặc cảm xúc của bạn sẽ hiển thị với bất
              cứ ai có thể xem nội dung của người đó và họ có thể thay đổi đối tượng sau này. Các ứng dụng, trang web và phần tích hợp của bên thứ ba có trên hoặc sử dụng
              Sản phẩm của chúng tôi.
            </li>
            <li>
              Khi bạn chọn sử dụng các ứng dụng, trang web hoặc dịch vụ khác của bên thứ ba dùng hoặc được tích hợp với Sản phẩm của chúng tôi, thì các ứng dụng, trang web
              hoặc dịch vụ đó có thể nhận được thông tin về nội dung bạn đăng hoặc chia sẻ. Chúng tôi không có trách nhiệm đối với các dữ liệu bạn đã chọn để chia sẻ qua
              các đối tác của chúng tôi. Thông tin mà các dịch vụ của bên thứ ba này thu thập sẽ tuân thủ các điều khoản và chính sách của chính họ, chứ không phải của
              ereport.vn.
            </li>
            <li>
              Chủ sở hữu mới: Nếu quyền sở hữu hoặc quyền kiểm soát tất cả hoặc một phần Sản phẩm của chúng tôi hoặc thành phần trong Sản phẩm thay đổi, chúng tôi có thể
              chuyển thông tin của bạn cho chủ sở hữu mới.
            </li>
            <li>
              Chia sẻ với các đối tác bên thứ ba: Chúng tôi hợp tác với các đối tác bên thứ ba là những người giúp chúng tôi cung cấp và cải thiện Sản phẩm của mình hoặc
              những người sử dụng Công cụ kinh doanh trên ereport.vn để phát triển doanh nghiệp của họ. Mục đích của chúng tôi là để vận hành các công ty của mình và
              cung cấp dịch vụ tốt nhất cho mọi người trên toàn thế giới. Chúng tôi không bán bất cứ thông tin nào của bạn cho bất kỳ ai và sẽ không bao giờ làm như vậy.
              Ngoài ra, chúng tôi còn áp dụng các hạn chế nghiêm ngặt đối với cách đối tác có thể sử dụng và tiết lộ dữ liệu chúng tôi cung cấp. Dưới đây là các loại bên
              thứ ba mà chúng tôi chia sẻ thông tin:
            </li>
            <li>
              Các đối tác sử dụng dịch vụ phân tích của chúng tôi: Chúng tôi cung cấp thông tin chi tiết và số liệu thống kê tổng hợp để giúp mọi người và doanh nghiệp hiểu
              rõ cách website của bạn đang hoạt động.
            </li>
            <li>
              Đối tác đo lường: Chúng tôi chia sẻ thông tin về bạn với những công ty tổng hợp thông tin đó để cung cấp dữ liệu phân tích và báo cáo đo lường cho các đối tác
              của chúng tôi. Ví dụ: Google Analytics.
            </li>
            <li>
              Đối tác cung cấp hàng hóa và dịch vụ trong Sản phẩm của chúng tôi: Khi bạn đăng ký nhận nội dung phải trả phí hoặc mua mặt hàng nào đó từ người bán trong Sản
              phẩm của chúng tôi, người sáng tạo nội dung hoặc người bán đó có thể nhận được thông tin công khai của bạn và các thông tin khác mà bạn chia sẻ với họ, cũng
              như thông tin cần thiết để hoàn thành giao dịch, bao gồm cả chi tiết liên hệ và giao hàng.
            </li>
            <li>
              Nhà cung cấp và nhà cung cấp dịch vụ: Chúng tôi cung cấp thông tin và nội dung cho các nhà cung cấp và nhà cung cấp dịch vụ hỗ trợ công việc của chúng tôi,
              chẳng hạn như bằng cách cung cấp các dịch vụ cơ sở hạ tầng kỹ thuật, phân tích cách mọi người sử dụng Sản phẩm của chúng tôi, cung cấp dịch vụ khách hàng, hỗ
              trợ thanh toán hoặc tiến hành khảo sát hay giúp các nhà phát triển tạo ra và kinh doanh các giao diện mẫu website của họ.
            </li>
            <li>
              Yêu cầu pháp lý hoặc yêu cầu của cơ quan hành pháp: Chúng tôi chia sẻ thông tin với cơ quan hành pháp hoặc theo yêu cầu pháp lý trong những trường hợp được
              yêu cầu của các cơ quan có thẩm quyền tại nước sở tại.
            </li>
          </ul>

          <div class="header">
            <div class="mark" />
            <div class="label">Những trường hợp không được chia sẻ:</div>
          </div>

          <ul class="statement">
            <li>
              Một số thông tin của bạn, khách hàng của bạn chia sẻ qua hệ thống ereport.vn được coi là bảo mật tuyệt đối. Ví dụ như dữ liệu về thông tin khách hàng
              để lại trên website của bạn. Chúng tôi cam kết thực hiện các điều khoản sau đối với các dữ liệu được coi là tuyệt đối này:
            </li>
            <li>
              Không chia sẻ cho các bên thứ ba dưới bất kỳ hình thức nào nếu chưa được bạn cho phép. Mọi dữ liệu về khách hàng của bạn, cách thức bạn sử dụng, cấu hình,
              chia sẻ trên sản phẩm của chúng tôi sẽ không được chia sẻ và khai thác bởi bất cứ bên thứ ba nào ngoại trừ các cá nhân, tổ chức đã được bạn chỉ định.
            </li>
            <li>
              Không sử dụng dữ liệu của bạn để phục vụ cho việc kinh doanh, thương mại các sản phẩm của ereport.vn hay bất kỳ bên thứ ba nào dù dưới bất kỳ hình thức
              nào. Mọi dữ liệu chúng tôi thu thập (Nếu có) sẽ chỉ được sử dụng nhằm mục tiêu nâng cao chất lượng sản phẩm hay tăng trải nghiệm của bạn trên hệ thống mà
              không được sử dụng để phục vụ các mục tiêu thương mại.
            </li>
            <li>
              Không sử dụng dữ liệu của bạn để chống lại bạn. Chúng tôi sẽ không sử dụng mọi dữ liệu của bạn trên hệ thống ereport.vn để chống lại bạn dù vì bất kỳ
              lý do nào, trừ khi có yêu cầu của cơ quan pháp luật.
            </li>
            <li>
              Quy trình xử lý khi có yêu cầu đặc biệt từ cơ quan pháp luật: Trong trường hợp bị buộc cung cấp thông tin vì các vấn đề an ninh, xã hội theo quy định của pháp
              luật và được yêu cầu bởi các cơ quan có thẩm quyền, ereport.vn sẽ không có trách nhiệm thông báo cho bạn trừ khi các cơ quan có thẩm quyền cho phép
              chúng tôi làm việc đó. Việc cung cấp thông tin này không miễn trừ bất kỳ nội dung gì mà chúng tôi thu thập, lưu trữ được từ bạn theo chính sách dữ liệu và
              điều khoản sử dụng dịch vụ của chúng tôi.
            </li>
          </ul>

          <div class="header">
            <div class="mark" />
            <div class="label">Thời gian lưu trữ thông tin</div>
          </div>

          <div style="font-size: 16px">Chúng tôi cung cấp cho bạn khả năng truy cập, sửa đổi, sao chép và xóa dữ liệu của mình.</div>
          <div style="font-size: 16px">
            Chúng tôi lưu trữ dữ liệu cho đến khi không còn cần cung cấp dịch vụ và Sản phẩm của ereport.vn nữa hoặc cho đến khi tài khoản của bạn bị xóa, tùy trường
            hợp nào xảy ra trước. Tùy theo từng trường hợp, chúng tôi sẽ quyết định dựa trên những yếu tố như bản chất của dữ liệu, lý do thu thập và xử lý dữ liệu, cũng
            như các nhu cầu lưu giữ vì mục đích hoạt động hoặc pháp lý có liên quan.
          </div>
          <div style="font-size: 16px">
            Khi bạn xóa tài khoản, chúng tôi sẽ xóa nội dung bạn đã đăng. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của
            ereport.vn.
          </div>

          <div class="header">
            <div class="mark" />
            <div class="label">Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</div>
          </div>

          <div class="addressBlock">
            <div v-for="(item, index) in CONTACTS" :key="index" class="contactItem">
              <CustomIcon :type="item.icon as any" />
              <div style="font-size: 16px">{{ item.label }}</div>
            </div>
          </div>

          <ul class="statement">
            <li>Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình.</li>
            <li>
              Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân
              hoặc yêu cầu ban quản trị website ereport.vn thực hiện việc này.
            </li>
            <li>
              Thành viên có quyền gửi khiếu nại về việc lộ thông tin cá nhân cho bên thứ 3 đến Ban quản trị của website ereport.vn. Khi tiếp nhận những phản hồi này,
              ereport.vn sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên khôi phục và bảo mật lại thông tin.
            </li>
          </ul>

          <div class="header">
            <div class="mark" />
            <div class="label">Cam kết bảo mật thông tin cá nhân khách hàng</div>
          </div>

          <ul class="statement">
            <li>
              Thông tin cá nhân của thành viên trên website ereport.vn được ereport.vn cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của
              ereport.vn. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật
              có quy định khác.
            </li>
            <li>
              Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.
            </li>
            <li>
              Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, website ereport.vn sẽ có trách nhiệm thông
              báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.
            </li>
            <li>
              Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn
              cấp 1 của ereport.vn.
            </li>
            <li>
              Ban quản lý website ereport.vn yêu cầu các cá nhân khi đăng ký/mua hàng là thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và
              tên, địa chỉ liên lạc, email, điện thoại, … và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý website ereport.vn không chịu
              trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung
              cấp khi đăng ký ban đầu là không chính xác.
            </li>
          </ul>

          <div class="header">
            <div class="mark" />
            <div class="label">Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích</div>
          </div>
          <div style="font-size: 16px">
            Khi phát hiện thông tin cá nhân của mình bị sử dụng sai mục đích hoặc phạm vi, khách hàng vui ̣ lòng gửi email khiếu nại đến email:
            <b>info@ereport.vn</b> hoặc gọi điện thoại tới <b>033.806.2221</b> để khiếu nại và cung cấp chứng cứ liên quan tới vụ việc cho Ban quản ̣ trị. Ban quản
            trị cam kết sẽ phản hồi ngay lập tức hoặc muộn nhất là trong vòng 48 giờ làm việc kể từ thời điểm nhận được khiếu nại.
          </div>
          <div style="font-size: 16px">
            Chúng tôi sẽ thông báo cho bạn trước khi thay đổi chính sách này và cung cấp cho bạn tùy chọn xem lại chính sách đã sửa đổi trước khi bạn chọn tiếp tục sử dụng
            Sản phẩm của chúng tôi.
          </div>
        </div>
      </div>
    </template>
  </TermAndPolicy>
</template>

<script setup lang="ts">
import { CONTACTS, PAGE_TITLES } from "~/constant/constains.js";

useSeoMeta({
  title: PAGE_TITLES.inforSecurityPolicy
})
</script>

<style lang="scss" scoped>
@import url("chinh-sach-bao-mat-thong-tin.scss");
</style>
