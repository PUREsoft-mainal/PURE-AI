// استخدام الطريقة التقليدية لتعريف الدوال لضمان عملها على Windows 7
document.addEventListener('DOMContentLoaded', function() {
    var sendBtn = document.getElementById('send-btn');
    var input = document.getElementById('user-input');
    var chat = document.getElementById('chat-window');

    // مفتاح API الخاص بك
    var API_KEY = "AIzaSyAXqRXuwz1rDUhbyIIjCu9JTiOW3Ub_rJA";

    function askAI() {
        var text = input.value.trim();
        if (!text) return;

        // عرض رسالة المستخدم
        chat.innerHTML += '<div class="user-msg"><b>أنت:</b> ' + text + '</div>';
        
        // تجهيز مكان رد الذكاء الاصطناعي
        var aiDiv = document.createElement('div');
        aiDiv.className = 'ai-msg';
        aiDiv.innerText = 'جاري التفكير...';
        chat.appendChild(aiDiv);
        
        input.value = ''; 
        chat.scrollTop = chat.scrollHeight;

        try {
            var genAI = new window.GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
            var model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            // استخدام then بدلاً من await لتجنب أخطاء Syntax في المتصفحات القديمة
            model.generateContent(text).then(function(result) {
                return result.response;
            }).then(function(response) {
                aiDiv.innerText = "PURE AI: " + response.text();
                chat.scrollTop = chat.scrollHeight;
            }).catch(function(error) {
                aiDiv.innerText = "خطأ في الاتصال: " + error.message;
            });

        } catch (error) {
            aiDiv.innerText = "خطأ: " + error.message;
        }
    }

    // ربط الزر بالدالة
    sendBtn.onclick = askAI;

    // ربط زر Enter
    input.onkeypress = function(e) {
        if (e.keyCode === 13 || e.which === 13) {
            askAI();
        }
    };
});
