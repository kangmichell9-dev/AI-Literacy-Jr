
export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: number; // For scoring or categorization
    type: 'interest' | 'usage' | 'literacy' | 'ethics';
  }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "AI(인공지능)라는 단어를 들으면 어떤 느낌이 들어?",
    options: [
      { label: "🚀 우와! 엄청 기대돼!", value: 4, type: 'interest' },
      { label: "❓ 신기하긴 한데 잘 몰라", value: 3, type: 'interest' },
      { label: "😨 나를 대신할까 봐 무서워", value: 2, type: 'interest' },
      { label: "😐 별생각 없어", value: 1, type: 'interest' }
    ]
  },
  {
    id: 2,
    text: "평소에 AI(시리, 빅스비, 유튜브 추천 알고리즘 등)를 얼마나 자주 만나고 있어?",
    options: [
      { label: "📱 눈 뜨자마자 잠들 때까지!", value: 4, type: 'usage' },
      { label: "🤔 생각해보니 가끔 쓰는 것 같아", value: 3, type: 'usage' },
      { label: "🤷 거의 안 만나는 것 같은데?", value: 2, type: 'usage' },
      { label: "🌪️ 인공지능이 뭔지 잘 모르겠어", value: 1, type: 'usage' }
    ]
  },
  {
    id: 3,
    text: "챗GPT나 제미나이 같은 대화형 AI를 직접 써본 적이 있어?",
    options: [
      { label: "🕹️ 이미 내 베프야 (자주 씀)", value: 4, type: 'usage' },
      { label: "👋 한두 번 말 걸어봤어", value: 3, type: 'usage' },
      { label: "👂 들어보긴 했는데 안 써봤어", value: 2, type: 'usage' },
      { label: "❓ 그게 뭐야? 처음 들어봐", value: 1, type: 'usage' }
    ]
  },
  {
    id: 4,
    text: "인공지능이 내 고민을 들어주는 친구가 될 수 있다고 생각해?",
    options: [
      { label: "🤝 당연하지! 비밀도 말할 수 있어", value: 4, type: 'interest' },
      { label: "💬 어느 정도 대화는 통할 것 같아", value: 3, type: 'interest' },
      { label: "🤖 그냥 기계일 뿐이야", value: 2, type: 'interest' },
      { label: "👻 상상만 해도 어색해", value: 1, type: 'interest' }
    ]
  },
  {
    id: 5,
    text: "숙제나 공부를 할 때 AI의 도움을 받아본 적이 있어?",
    options: [
      { label: "💡 모르는 게 생기면 바로 물어봐", value: 4, type: 'usage' },
      { label: "📝 가끔 아이디어를 얻을 때 써", value: 3, type: 'usage' },
      { label: "🚫 아니, 내 힘으로만 해", value: 2, type: 'usage' },
      { label: "🔍 어떻게 도움받는지 궁금해", value: 1, type: 'usage' }
    ]
  },
  {
    id: 6,
    text: "AI가 내 미래 직업에 정말 큰 영향을 줄까?",
    options: [
      { label: "🌊 완전 정복! 엄청난 변화가 올 거야", value: 4, type: 'literacy' },
      { label: "🏠 조금은 바뀌겠지만 비슷할 거야", value: 3, type: 'literacy' },
      { label: "🏝️ 나랑은 상관없는 이야기 같아", value: 2, type: 'literacy' },
      { label: "😶 잘 모르겠어", value: 1, type: 'literacy' }
    ]
  },
  {
    id: 7,
    text: "AI가 그린 그림이나 만든 음악도 '예술'이라고 생각하니?",
    options: [
      { label: "🎨 그럼! 새로운 예술이야", value: 4, type: 'literacy' },
      { label: "🖼️ 사람은 못 따라오지만 대단해", value: 3, type: 'literacy' },
      { label: "📐 그냥 계산된 결과물일 뿐이야", value: 2, type: 'literacy' },
      { label: "😤 가짜라고 생각해", value: 1, type: 'literacy' }
    ]
  },
  {
    id: 8,
    text: "AI가 알려주는 정보는 100% 믿을 수 있을까?",
    options: [
      { label: "✅ 기계는 틀리지 않아. 다 믿어", value: 1, type: 'ethics' },
      { label: "🧐 절반 정도는 맞겠지?", value: 2, type: 'ethics' },
      { label: "⚠️ 반드시 결과물을 다시 확인해봐야 해", value: 4, type: 'ethics' },
      { label: "🔎 AI도 거짓말을 할 수 있다는 걸 알아", value: 3, type: 'ethics' }
    ]
  },
  {
    id: 9,
    text: "AI에게 물어본 내용들이 어딘가에 저장된다는 걸 알고 있었어?",
    options: [
      { label: "🔒 응! 그래서 조심해서 물어봐", value: 4, type: 'ethics' },
      { label: "📁 저장된다는 소리는 들어봤어", value: 3, type: 'ethics' },
      { label: "😱 헐, 진짜? 처음 알았어", value: 2, type: 'ethics' },
      { label: "🤷 저장되든 말든 상관없어", value: 1, type: 'ethics' }
    ]
  },
  {
    id: 10,
    text: "무료 AI 서비스를 쓸 때 '이용약관'을 읽어본 적이 있어?",
    options: [
      { label: "📋 꼼꼼하게 읽고 가입해", value: 4, type: 'ethics' },
      { label: "🔍 중요한 부분만 쓱 훑어봐", value: 3, type: 'ethics' },
      { label: "🔘 귀찮아! 그냥 '동의' 누르지", value: 2, type: 'ethics' },
      { label: "❓ 그런 게 있었어?", value: 1, type: 'ethics' }
    ]
  },
  {
    id: 11,
    text: "AI가 인간의 슬픈 마음을 진짜로 '이해'하고 공감할 수 있을까?",
    options: [
      { label: "😢 응, 나보다 더 잘 이해할지도 몰라", value: 1, type: 'literacy' },
      { label: "🎭 이해하는 '척' 연기를 아주 잘할 뿐이야", value: 4, type: 'literacy' },
      { label: "🤖 로봇에게 감정은 없어", value: 3, type: 'literacy' },
      { label: "😶 잘 생각 안 해봤어", value: 2, type: 'literacy' }
    ]
  },
  {
    id: 12,
    text: "유튜브나 틱톡에서 내가 좋아하는 영상만 계속 나오는 이유가 뭐라고 생각해?",
    options: [
      { label: "🧠 똑똑한 AI 알고리즘 덕분이야", value: 4, type: 'literacy' },
      { label: "🍀 그냥 운이 좋았어", value: 1, type: 'literacy' },
      { label: "👁️ 누군가 나를 지켜보고 있는 것 같아", value: 2, type: 'literacy' },
      { label: "🖥️ 원래 시스템이 그런 거 아냐?", value: 3, type: 'literacy' }
    ]
  },
  {
    id: 13,
    text: "미래에는 AI가 세상의 모든 질병과 환경 문제를 해결할 수 있을까?",
    options: [
      { label: "🌈 당연하지! AI는 슈퍼히어로야", value: 4, type: 'interest' },
      { label: "🔧 사람이 도와주면 가능할지도 몰라", value: 3, type: 'interest' },
      { label: "🌫️ 아무리 똑똑해도 한계가 있어", value: 2, type: 'interest' },
      { label: "🙅 불가능할 것 같아", value: 1, type: 'interest' }
    ]
  },
  {
    id: 14,
    text: "앞으로는 AI를 잘 다루는 능력이 학교 성적보다 중요해질까?",
    options: [
      { label: "🥇 무조건! AI 다루는 게 최고야", value: 4, type: 'interest' },
      { label: "⚖️ 둘 다 중요하다고 생각해", value: 3, type: 'interest' },
      { label: "🎒 그래도 학교 공부가 기본이지!", value: 2, type: 'interest' },
      { label: "🧐 잘 모르겠어", value: 1, type: 'interest' }
    ]
  },
  {
    id: 15,
    text: "AI가 만든 가짜 뉴스나 조작된 사진을 보면 구분할 수 있겠어?",
    options: [
      { label: "🕵️‍♂️ 난 한 눈에 척보면 알아!", value: 4, type: 'literacy' },
      { label: "🔍 자세히 보면 티가 날걸?", value: 3, type: 'literacy' },
      { label: "😵 너무 감쪽같아서 어려울 것 같아", value: 2, type: 'literacy' },
      { label: "🏳️ 절대 구분 못 해", value: 1, type: 'literacy' }
    ]
  },
  {
    id: 16,
    text: "학교에서 AI가 가르쳐주는 'AI 선생님'반이 생긴다면?",
    options: [
      { label: "🎒 대박! 그 반으로 바로 옮길래", value: 4, type: 'usage' },
      { label: "👨‍🏫 신기하긴 한데 선생님이 더 좋아", value: 2, type: 'usage' },
      { label: "🤖 로봇이 가르치는 건 좀 무서워", value: 1, type: 'usage' },
      { label: "💤 수업이 더 지루할 것 같아", value: 3, type: 'usage' }
    ]
  },
  {
    id: 17,
    text: "AI가 내 개인정보를 가져가는 것에 대해 어떻게 느껴?",
    options: [
      { label: "🚨 내 정보는 내가 지켜야지! 걱정돼", value: 4, type: 'ethics' },
      { label: "😟 조금 신경 쓰이긴 해", value: 3, type: 'ethics' },
      { label: "🔓 편할 수만 있다면 상관없어", value: 2, type: 'ethics' },
      { label: "📡 원래 다 털리는 거 아냐?", value: 1, type: 'ethics' }
    ]
  },
  {
    id: 18,
    text: "AI가 내 진로나 고등학교를 정해주면 그대로 따를 거야?",
    options: [
      { label: "🗺️ 데이터가 정확하니까 믿고 따름!", value: 4, type: 'ethics' },
      { label: "💡 참고는 하겠지만 내가 정해", value: 3, type: 'ethics' },
      { label: "🚫 내 인생을 기계에 맡길 순 없지", value: 2, type: 'ethics' },
      { label: "🔇 AI 말은 아예 무시할 거야", value: 1, type: 'ethics' }
    ]
  },
  {
    id: 19,
    text: "학교 정규 수업 시간에 AI 활용법을 배우고 싶니?",
    options: [
      { label: "🙋 완전! 매일 배우고 싶어", value: 4, type: 'interest' },
      { label: "💻 코딩 같은 건 조금 궁금해", value: 3, type: 'interest' },
      { label: "📖 그냥 지금 배우는 게 더 나아", value: 2, type: 'interest' },
      { label: "😴 수업 자체가 듣기 싫어", value: 1, type: 'interest' }
    ]
  },
  {
    id: 20,
    text: "10년 뒤, AI는 너에게 어떤 존재가 되어있을까?",
    options: [
      { label: "🤝 없어서는 안 될 마법 같은 파트너", value: 4, type: 'interest' },
      { label: "🛠️ 그냥 성능 좋은 전자기기 정도?", value: 3, type: 'interest' },
      { label: "🥊 내가 일자리를 뺏길까 봐 경쟁하는 상대", value: 2, type: 'interest' },
      { label: "🌫️ 지금이랑 크게 다를 바 없을 거야", value: 1, type: 'interest' }
    ]
  }
];
