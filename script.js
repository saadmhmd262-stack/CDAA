// هذا السطر يضمن أن الكود لن يعمل إلا بعد أن يتم تحميل كامل الصفحة
document.addEventListener('DOMContentLoaded', () => {

    // --- ضع مفتاح الـ API الخاص بك هنا ---
    const API_KEY = "437b0ce2a40ea46ba3485dbc8777b78d"; // <-- تأكد من أن هذا المفتاح صحيح
    // ------------------------------------

    // تعريف كل عناصر الصفحة التي سنتعامل معها
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const statusMessage = document.getElementById('status-message');
    const resultSection = document.getElementById('result-section');
    const resultUrlInput = document.getElementById('result-url');
    const copyBtn = document.getElementById('copy-btn');

    // هذه هي الدالة الرئيسية التي ستقوم بعملية الرفع
    const handleUpload = async () => {
        const file = fileInput.files[0];

        if (!file) {
            statusMessage.textContent = '⚠️ الرجاء اختيار ملف أولاً.';
            return;
        }

        // تعطيل الزر لمنع الرفع المتكرر
        uploadBtn.disabled = true;
        statusMessage.textContent = '⏳ جاري رفع الملف...';
        resultSection.classList.add('hidden');

        const formData = new FormData();
        formData.append('image', file);
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                statusMessage.textContent = '';
                resultUrlInput.value = data.data.url;
                resultSection.classList.remove('hidden');
            } else {
                // عرض رسالة الخطأ التي تأتي من الموقع نفسه
                throw new Error(data.error.message);
            }

        } catch (error) {
            statusMessage.textContent = `❌ حدث خطأ: ${error.message}`;
            console.error('Upload Error:', error);
        } finally {
            // هذا الجزء يعمل دائماً، سواء نجحت العملية أو فشلت
            // وهو يضمن إعادة تفعيل الزر
            uploadBtn.disabled = false;
        }
    };

    // دالة لنسخ الرابط
    const copyUrlToClipboard = () => {
        resultUrlInput.select();
        document.execCommand('copy');
        copyBtn.textContent = 'تم النسخ!';
        setTimeout(() => {
            copyBtn.textContent = 'نسخ';
        }, 2000);
    };

    // ربط الأحداث بالدوال
    uploadBtn.addEventListener('click', handleUpload);
    copyBtn.addEventListener('click', copyUrlToClipboard);
});
