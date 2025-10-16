// --- الصق كود إعداد Firebase الخاص بك هنا ---
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};
// -----------------------------------------

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// تعريف عناصر الصفحة
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const statusMessage = document.getElementById('status-message');
const resultSection = document.getElementById('result-section');
const resultUrlInput = document.getElementById('result-url');
const copyBtn = document.getElementById('copy-btn');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');

const handleUpload = () => {
    const file = fileInput.files[0];
    if (!file) {
        statusMessage.textContent = '⚠️ الرجاء اختيار ملف أولاً.';
        return;
    }

    const storageRef = storage.ref(`uploads/${Date.now()}_${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = progress + '%';
            progressBarContainer.classList.remove('d-none');
            uploadBtn.disabled = true;
            statusMessage.textContent = '';
            resultSection.classList.add('d-none');
        },
        (error) => {
            statusMessage.textContent = `❌ حدث خطأ: ${error.message}`;
            uploadBtn.disabled = false;
            progressBarContainer.classList.add('d-none');
        },
        () => {
            // هذا الجزء هو المسؤول عن إظهار الرابط بعد النجاح
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL); // لغرض التجربة في الكونسول
                resultUrlInput.value = downloadURL;
                resultSection.classList.remove('d-none'); // إظهار قسم النتائج
                uploadBtn.disabled = false;
                progressBarContainer.classList.add('d-none'); // إخفاء شريط التقدم
            });
        }
    );
};

const copyUrlToClipboard = () => {
    resultUrlInput.select();
    document.execCommand('copy');
    copyBtn.textContent = 'تم النسخ!';
    setTimeout(() => { copyBtn.textContent = 'نسخ'; }, 2000);
};

uploadBtn.addEventListener('click', handleUpload);
copyBtn.addEventListener('click', copyUrlToClipboard);
