// تعريف الدالة وربطها بالزر برمجياً لضمان عدم حدوث خطأ "غير معرفة"
document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('user-input');
    const chat = document.getElementById('chat-window');

    // مفتاح API الخاص بك
    const API_KEY = "AIzaSyAXqRXuwz1rDUhbyIIjCu9JTiOW3Ub_rJA";

    async function askAI() {
        const text = input.value.trim();
        if (!text) return;

        // عرض رسالة المستخدم
        chat.innerHTML += <div class="user-msg"><b>أنت:</b> ${text}</div>;
        
        // تجهيز مكان رد الذكاء الاصطناعي
        const aiDiv = document.createElement('div');
        aiDiv.className = 'ai-msg';
        aiDiv.innerText = 'جاري التفكير...';
        chat.appendChild(aiDiv);
        
        input.value = ''; // مسح الإدخال
        chat.scrollTop = chat.scrollHeight;

        try {
            const genAI = new window.GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(text);
            const response = await result.response;
            
            aiDiv.innerText = "PURE AI: " + response.text();
        } catch (error) {
            aiDiv.innerText = "خطأ: " + error.message;
            console.error(error);
        }
        chat.scrollTop = chat.scrollHeight;
    }

    // ربط الضغط على الزر بالدالة
    sendBtn.addEventListener('click', askAI);

    // ربط زر Enter بالكيبورد بالدالة
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askAI();
        }
    });
});
