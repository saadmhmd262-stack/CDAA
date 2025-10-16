// --- مفاتيح Supabase الخاصة بك ---
const SUPABASE_URL = 'https://cpobpuwxahmgkfkylsrt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwb2JwdXd4YWhtZ2tma3lsc3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODMzMzYsImV4cCI6MjA3NjE1OTMzNn0.zuko3Ya8-h_ufy9TIOqp5PdOH2iekYGxLGugZU6qb3U';
// ------------------------------------

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const statusMessage = document.getElementById('status-message');
const resultSection = document.getElementById('result-section');
const resultUrlInput = document.getElementById('result-url');
const copyBtn = document.getElementById('copy-btn');
const spinner = uploadBtn.querySelector('span');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');

const handleUpload = async () => {
    const file = fileInput.files[0];
    if (!file) {
        statusMessage.textContent = '⚠️ الرجاء اختيار ملف أولاً.';
        return;
    }

    uploadBtn.disabled = true;
    spinner.classList.remove('d-none');
    statusMessage.textContent = '⏳ جاري رفع الملف...';
    resultSection.classList.add('d-none');
    progressBarContainer.classList.remove('d-none');
    progressBar.style.width = '0%';

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file, {
            cacheControl: '3
