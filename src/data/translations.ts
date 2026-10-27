export type SupportedLanguage = "en" | "am" | "om" | "fr" | "ar";

export interface Translations {
  appName: string;
  tagline: string;
  taglineDesc: string;
  loginTitle: string;
  loginSubtitle: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  loginButton: string;
  forgotPassword: string;
  createNewAccount: string;
  alreadyHaveAccount: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  country: string;
  region: string;
  city: string;
  dob: string;
  gender: string;
  genderFemale: string;
  genderMale: string;
  genderCustom: string;
  genderPreferNotToSay: string;
  termsAgreement: string;
  termsLink: string;
  privacyLink: string;
  registerButton: string;
  clearForm: string;
  demoNotice: string;
  detectLocation: string;
  quickSelectEthiopia: string;
  searchCountry: string;
  telecomDirectory: string;
  presentationMode: string;
  testChecklist: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    appName: "ConnectBook",
    tagline: "Connect with friends and the world around you on ConnectBook.",
    taglineDesc: "A safe, privacy-first international platform built for universal accessibility.",
    loginTitle: "Log In to ConnectBook",
    loginSubtitle: "Sign in with your email or international phone number",
    emailOrPhone: "Email address or phone number",
    password: "Password",
    confirmPassword: "Confirm password",
    loginButton: "Log In",
    forgotPassword: "Forgot password?",
    createNewAccount: "Create New Account",
    alreadyHaveAccount: "Already have an account? Log in",
    firstName: "First name",
    lastName: "Last name",
    emailAddress: "Email address",
    mobileNumber: "Mobile number",
    country: "Country / Territory",
    region: "Region / State",
    city: "City / Sub-city",
    dob: "Date of birth",
    gender: "Gender",
    genderFemale: "Female",
    genderMale: "Male",
    genderCustom: "Custom",
    genderPreferNotToSay: "Prefer not to say",
    termsAgreement: "By clicking Register, you agree to our Terms, Privacy Policy, and Cookies Policy.",
    termsLink: "Terms of Service",
    privacyLink: "Privacy Policy",
    registerButton: "Register for ConnectBook",
    clearForm: "Reset Form",
    demoNotice: "Frontend Demo Mode: No real credentials collected or stored.",
    detectLocation: "Detect My Country",
    quickSelectEthiopia: "Select Ethiopia (🇪🇹 +251)",
    searchCountry: "Search by country, ISO, or +code...",
    telecomDirectory: "Telecom Directory",
    presentationMode: "Instructor Presentation",
    testChecklist: "Verification Tests",
  },
  am: {
    appName: "ኮኔክትቡክ (ConnectBook)",
    tagline: "በኮኔክትቡክ ከጓደኞችዎ እና ከመላው ዓለም ጋር ይገናኙ።",
    taglineDesc: "ሁለንተናዊ ተደራሽነትን ያገናዘበ፣ ደህንነቱ የተጠበቀ ዓለም አቀፍ ማህበራዊ መድረክ።",
    loginTitle: "ወደ ኮኔክትቡክ ይግቡ",
    loginSubtitle: "በኢሜይልዎ ወይም በስልክ ቁጥርዎ ይግቡ",
    emailOrPhone: "የኢሜይል አድራሻ ወይም የስልክ ቁጥር",
    password: "የይለፍ ቃል",
    confirmPassword: "የይለፍ ቃል ያረጋግጡ",
    loginButton: "ግባ",
    forgotPassword: "የይለፍ ቃል ረሱ?",
    createNewAccount: "አዲስ መለያ ይፍጠሩ",
    alreadyHaveAccount: "መለያ አለዎት? ይግቡ",
    firstName: "ስም",
    lastName: "የአባት ስም",
    emailAddress: "የኢሜይል አድራሻ",
    mobileNumber: "የሞባይል ስልክ ቁጥር",
    country: "አገር",
    region: "ክልል / ከተማ አስተዳደር",
    city: "ከተማ / ክፍለ ከተማ",
    dob: "የትውልድ ቀን",
    gender: "ጾታ",
    genderFemale: "ሴት",
    genderMale: "ወንድ",
    genderCustom: "ሌላ",
    genderPreferNotToSay: "መግለጽ አልፈልግም",
    termsAgreement: "ይመዝገቡን ሲጫኑ የአገልግሎት ደንቦችን እና የግላዊነት ፖሊሲን ይቀበላሉ።",
    termsLink: "የአገልግሎት ውሎች",
    privacyLink: "የግላዊነት ፖሊሲ",
    registerButton: "በኮኔክትቡክ ይመዝገቡ",
    clearForm: "ቅጽ አጽዳ",
    demoNotice: "የማሳያ ሁነታ: ምንም እውነተኛ የይለፍ ቃል አይቀመጥም።",
    detectLocation: "አገሬን አግኝ",
    quickSelectEthiopia: "ኢትዮጵያን ምረጥ (🇪🇹 +251)",
    searchCountry: "በአገር ስም ወይም ኮድ ፈልግ...",
    telecomDirectory: "የቴሌኮም ማውጫ",
    presentationMode: "የዩኒቨርሲቲ ገለጻ",
    testChecklist: "የሙከራ ማረጋገጫ",
  },
  om: {
    appName: "ConnectBook",
    tagline: "ConnectBook irratti michoota kee fi addunyaa waliin wal qunnamaa.",
    taglineDesc: "Walgahiifi nageenya qabeessa kan ta'e marsariitii hawaasaa.",
    loginTitle: "Gara ConnectBook Seenaa",
    loginSubtitle: "Imeelii ykn lakkoofsa bilbilaan seenaa",
    emailOrPhone: "Imeelii ykn lakkoofsa bilbilaa",
    password: "Jecha Icceetii",
    confirmPassword: "Jecha Icceetii Mirkaneessi",
    loginButton: "Seeni",
    forgotPassword: "Jecha icceetii irraanfattee?",
    createNewAccount: "Herrega Haaraa Uumi",
    alreadyHaveAccount: "Herrega qabdaa? Seeni",
    firstName: "Maqaa",
    lastName: "Maqaa Abbaa",
    emailAddress: "Teessoo Imeelii",
    mobileNumber: "Lakkoofsa Bilbilaa",
    country: "Biyya",
    region: "Naannoo",
    city: "Magaalaa",
    dob: "Guyyaa Dhalootaa",
    gender: "Korniyaa",
    genderFemale: "Dhalaa",
    genderMale: "Dhiira",
    genderCustom: "Kan biraa",
    genderPreferNotToSay: "Ibsuu hin barbaadu",
    termsAgreement: "Yoo Galmaa'i cuqqaste seeraafi imaammata keenya fudhatteetta.",
    termsLink: "Waliigaltee Tajaajilaa",
    privacyLink: "Imaammata Qulqullinaa",
    registerButton: "ConnectBook irratti Galmaa'aa",
    clearForm: "Haquu",
    demoNotice: "Moodeela Agarsiisaa: Ragaan dhugaa hin kuufamu.",
    detectLocation: "Biyya Koo Barbaadi",
    quickSelectEthiopia: "Itoophiyaa Filadhu (🇪🇹 +251)",
    searchCountry: "Maqaa ykn koodiin barbaadaa...",
    telecomDirectory: "Galmee Telekoomii",
    presentationMode: "Ibsa Yuunivarsitii",
    testChecklist: "Qormaata Mirkanneessuu",
  },
  fr: {
    appName: "ConnectBook",
    tagline: "Avec ConnectBook, connectez-vous avec vos amis et le monde entier.",
    taglineDesc: "Une plateforme sociale internationale, sécurisée et axée sur la confidentialité.",
    loginTitle: "Se connecter à ConnectBook",
    loginSubtitle: "Connectez-vous avec votre e-mail ou votre numéro international",
    emailOrPhone: "Adresse e-mail ou numéro de mobile",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    loginButton: "Se connecter",
    forgotPassword: "Mot de passe oublié ?",
    createNewAccount: "Créer un nouveau compte",
    alreadyHaveAccount: "Vous avez déjà un compte ? Se connecter",
    firstName: "Prénom",
    lastName: "Nom de famille",
    emailAddress: "Adresse e-mail",
    mobileNumber: "Numéro de mobile",
    country: "Pays / Territoire",
    region: "Région / Département",
    city: "Ville / Commune",
    dob: "Date de naissance",
    gender: "Genre",
    genderFemale: "Femme",
    genderMale: "Homme",
    genderCustom: "Personnalisé",
    genderPreferNotToSay: "Ne souhaite pas préciser",
    termsAgreement: "En cliquant sur S'inscrire, vous acceptez nos Conditions et notre Politique de confidentialité.",
    termsLink: "Conditions d'utilisation",
    privacyLink: "Politique de confidentialité",
    registerButton: "S'inscrire sur ConnectBook",
    clearForm: "Réinitialiser",
    demoNotice: "Mode démonstration : Aucun identifiant réel n'est collecté.",
    detectLocation: "Détecter mon pays",
    quickSelectEthiopia: "Sélectionner l'Éthiopie (🇪🇹 +251)",
    searchCountry: "Rechercher par pays ou indicatif...",
    telecomDirectory: "Annuaire Télécom",
    presentationMode: "Présentation Universitaire",
    testChecklist: "Tests de validation",
  },
  ar: {
    appName: "كونيكت بوك (ConnectBook)",
    tagline: "تواصل مع الأصدقاء والعالم من حولك عبر كونيكت بوك.",
    taglineDesc: "منصة اجتماعية دولية رائدة تضمن الخصوصية وسهولة الاستخدام.",
    loginTitle: "تسجيل الدخول إلى كونيكت بوك",
    loginSubtitle: "سجل الدخول باستخدام بريدك الإلكتروني أو رقم هاتفك الدولي",
    emailOrPhone: "البريد الإلكتروني أو رقم الهاتف",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    loginButton: "تسجيل الدخول",
    forgotPassword: "هل نسيت كلمة السر؟",
    createNewAccount: "إنشاء حساب جديد",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟ تسجيل الدخول",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    emailAddress: "البريد الإلكتروني",
    mobileNumber: "رقم الهاتف المحمول",
    country: "الدولة / الإقليم",
    region: "المنطقة / المحافظة",
    city: "المدينة / الحي",
    dob: "تاريخ الميلاد",
    gender: "الجنس",
    genderFemale: "أنثى",
    genderMale: "ذكر",
    genderCustom: "مخصص",
    genderPreferNotToSay: "أفضل عدم الإفصاح",
    termsAgreement: "بالنقر على التسجيل، فإنك توافق على الشروط وسياسة الخصوصية الخاصة بنا.",
    termsLink: "شروط الخدمة",
    privacyLink: "سياسة الخصوصية",
    registerButton: "التسجيل في كونيكت بوك",
    clearForm: "مسح النموذج",
    demoNotice: "وضع العرض التوضيحي: لا يتم تخزين أي بيانات اعتماد حقيقية.",
    detectLocation: "تحديد دولتي",
    quickSelectEthiopia: "اختيار إثيوبيا (🇪🇹 +251)",
    searchCountry: "البحث باسم الدولة أو الرمز الدولي...",
    telecomDirectory: "دليل الاتصالات",
    presentationMode: "عرض المشروع الجامعي",
    testChecklist: "اختبارات التحقق",
  },
};
