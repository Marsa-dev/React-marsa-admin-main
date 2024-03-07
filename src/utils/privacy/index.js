const Engpolicy = {
  h1: 'Privacy Policy',
  p1: 'This Privacy Policy outlines the types of personal information we collect from users, how we use that information, and the steps we take to protect it. By using our platform, you agree to the terms outlined in this Privacy Policy.',

  textComponents: [
    {
      h: 'Information Collection and Use:',
      p: 'We collect personal information from users when they register on our platform, make a booking, or communicate with us. This information may include your name, email address, phone number, and payment information. We use this information to provide our services, process payments, and communicate with users.We may also collect non-personal information about users, such as their device type, browser type, and IP address, to improve the user experience and ensure platform security.',
    },
    {
      h: 'Information Sharing:',
      p: 'We may share users personal information with boat owners to facilitate bookings and with third-party service providers to process payments and improve our platform. We do not sell or rent users personal information to third parties.We may disclose users personal information if required by law or in response to a legal request.',
    },
    {
      h: 'Data Security:',
      p: 'We take steps to ensure the security of users personal information, including the use of encryption and secure data storage. However, no method of data transmission over the internet or electronic storage is 100% secure. We cannot guarantee the absolute security of users personal information',
    },
    {
      h: 'User Rights:',
      p: 'Users have the right to access, correct, or delete their personal information by contacting us at the email address provided below.',
    },
    {
      h: 'Changes to this Policy:',
      p: 'We may update this Privacy Policy from time to time. Users will be notified of any significant changes to this policy via email or through our platform.',
    },
    {
      h: 'Contact Us:',
      p: 'If you have any questions about this Privacy Policy or our platform privacy practices, please contact us at support@---.---',
    },
  ],
};

const ArabicPolicy = {
  h1: 'سياسة الخصوصية',
  p1: 'توضح سياسة الخصوصية هذه أنواع المعلومات الشخصية التي نقوم بجمعها من المستخدمين، وكيفية استخدامنا لتلك المعلومات، والإجراءات التي نتخذها لحمايتها. من خلال استخدام منصتنا، توافق على الشروط المبينة في هذه سياسة الخصوصية.',

  textComponents: [
    {
      h: 'جمع المعلومات واستخدامها:',
      p: 'نقوم بجمع المعلومات الشخصية من المستخدمين عند تسجيلهم في منصتنا، أو عند إجراء حجز، أو عند التواصل معنا. قد تتضمن هذه المعلومات اسمك، عنوان بريدك الإلكتروني، رقم هاتفك، ومعلومات الدفع. نحن نستخدم هذه المعلومات لتقديم خدماتنا، ومعالجة المدفوعات، والتواصل مع المستخدمين. قد نقوم أيضًا بجمع معلومات غير شخصية عن المستخدمين، مثل نوع جهازهم، ونوع المتصفح، وعنوان IP، لتحسين تجربة المستخدم وضمان أمان المنصة.',
    },
    {
      h: 'مشاركة المعلومات:',
      p: 'قد نشارك المعلومات الشخصية للمستخدمين مع أصحاب القوارب لتسهيل الحجوزات ومع مقدمي الخدمات من الأطراف الثالثة لمعالجة المدفوعات وتحسين منصتنا. نحن لا نبيع أو نؤجر المعلومات الشخصية لأطراف ثالثة. قد نكشف عن معلومات المستخدمين الشخصية إذا كان ذلك مطلوبًا قانونيًا أو استجابةً لطلب قانوني.',
    },
    {
      h: 'أمان البيانات:',
      p: 'نتخذ خطوات لضمان أمان المعلومات الشخصية للمستخدمين، بما في ذلك استخدام التشفير وتخزين البيانات الآمن. ومع ذلك، لا يمكن ضمان الأمان المطلق للمعلومات الشخصية عبر الإنترنت أو التخزين الإلكتروني. لا يمكننا ضمان الأمان المطلق للمعلومات الشخصية للمستخدمين.',
    },
    {
      h: 'حقوق المستخدم:',
      p: 'للمستخدمين الحق في الوصول إلى معلوماتهم الشخصية أو تصحيحها أو حذفها عن طريق الاتصال بنا على العنوان الإلكتروني المُقدم أدناه.',
    },
    {
      h: 'تغييرات على هذه السياسة:',
      p: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم إشعار المستخدمين بأي تغييرات كبيرة في هذه السياسة عبر البريد الإلكتروني أو من خلال منصتنا.',
    },
    {
      h: 'اتصل بنا:',
      p: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات الخصوصية في منصتنا، يرجى الاتصال بنا على البريد الإلكتروني support@---.---.',
    },
  ],
};

export const termswithlanguagePrivacy = (language) => {
  if (language === 'English') {
    return Engpolicy;
  }
  return ArabicPolicy;
};
