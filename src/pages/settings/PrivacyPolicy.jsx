import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');

  // الأدوات (Toolbar Options)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],  // العناوين
      [{ font: [] }],                   // نوع الخط
      [{ size: [] }],                   // حجم الخط
      ["bold", "italic", "underline", "strike"], // تنسيقات أساسية
      [{ color: [] }, { background: [] }],       // ألوان النص والخلفية
      [{ script: "sub" }, { script: "super" }],  // Subscript / Superscript
      [{ align: [] }],                  // المحاذاة
      [{ list: "ordered" }, { list: "bullet" }], // القوائم
      ["blockquote", "code-block"],     // اقتباس وكود
      ["link", "image", "video"],       // إدراج وسائط
      ["clean"],                        // مسح التنسيق
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold", "italic", "underline", "strike",
    "color", "background",
    "script",
    "align",
    "list", "bullet",
    "blockquote", "code-block",
    "link", "image", "video"
  ];

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4 mt-10">سياسة الخصوصية</h2>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="h-[300px] mb-10 rtl-editor"
          />
        </div>

        <button
          onClick={() => console.log(content)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          حفظ
        </button>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
