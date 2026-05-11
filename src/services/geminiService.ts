
interface AIProfile {
  title: string;
  description: string;
  strength: string;
  mission: string;
  characterCategory: "EXPLORER" | "NINJA" | "SAGE" | "GUARDIAN" | "MASTER" | "PIONEER";
  emoji: string;
}

const STATIC_PROFILES: Record<string, AIProfile> = {
  EXPLORER: {
    title: "호기심 가득한 AI 탐험가",
    description: "새로운 AI 도구가 나오면 누구보다 먼저 써보고 싶어 하는 호기심 대장이에요! AI를 두려워하기보다 즐거운 놀이터처럼 생각하는 긍정적인 에너지가 넘치네요.",
    strength: "새로운 기술에 대한 높은 관심도와 빠른 적응력",
    mission: "단순한 재미를 넘어 AI를 실제 학습과 문제 해결에 활용하는 습관 기르기",
    characterCategory: "EXPLORER",
    emoji: "🛰️"
  },
  NINJA: {
    title: "빠르고 정확한 AI 닌자",
    description: "AI의 기능을 정확히 파악하고 필요한 정보를 순식간에 찾아내는 능력이 탁월해요. 도구를 다루는 손길이 예리하고 군더더기가 없군요!",
    strength: "AI 도구를 목적에 맞게 조작하고 결과물을 만들어내는 실무 능력",
    mission: "AI가 내놓은 결과물이 정말 올바른 것인지 비판적으로 검토하는 시각 갖추기",
    characterCategory: "NINJA",
    emoji: "🥷"
  },
  SAGE: {
    title: "깊이 있게 이해하는 AI 현자",
    description: "AI가 어떻게 작동하는지 원리를 궁금해하고 논리적으로 이해하는 능력이 뛰어나요. 겉모습보다 본질을 꿰뚫어 보는 지혜를 가졌네요.",
    strength: "인공지능의 개념적 원리와 데이터의 흐름에 대한 깊은 이해력",
    mission: "이해한 이론을 바탕으로 자신만의 독창적인 AI 프로젝트 기획해보기",
    characterCategory: "SAGE",
    emoji: "🧘"
  },
  GUARDIAN: {
    title: "정의로운 AI 가디언",
    description: "기술의 발전보다 중요한 것이 인간의 윤리와 책임이라고 믿는 따뜻한 마음을 가졌어요. AI를 안전하고 올바르게 사용하려는 의지가 매우 강력합니다.",
    strength: "AI 윤리 의식과 디지털 책임감, 정보 보안에 대한 철저함",
    mission: "윤리적 기준을 지키면서도 AI 기술을 더 적극적으로 활용해 세상을 이롭게 만들기",
    characterCategory: "GUARDIAN",
    emoji: "🛡️"
  },
  MASTER: {
    title: "균형 잡힌 AI 마스터",
    description: "관심, 활용, 이해, 윤리 모든 면에서 고른 실력을 갖춘 완벽주의자 스타일이에요! AI 시대의 리더가 될 준비가 이미 끝난 것 같네요.",
    strength: "모든 영역에서의 균형 잡힌 역량과 압도적인 종합 지수",
    mission: "주변 친구들에게 AI를 올바르게 사용하는 방법을 알려주는 멘토가 되어보기",
    characterCategory: "MASTER",
    emoji: "👑"
  },
  PIONEER: {
    title: "미래를 여는 AI 개척자",
    description: "기존의 틀에 박힌 생각에서 벗어나 AI로 새로운 가치를 만들어내려는 도전 정신이 빛나요. 남들이 가지 않은 길을 개척하는 용기가 멋집니다.",
    strength: "창의적인 사고방식과 AI 기술을 융합하는 혁신적인 태도",
    mission: "나만의 아이디어를 실제 구동 가능한 AI 모델이나 서비스로 구현해보기",
    characterCategory: "PIONEER",
    emoji: "🚀"
  }
};

export async function generateAIProfile(scores: {
  interest: number;
  usage: number;
  literacy: number;
  ethics: number;
}) {
  // Simulate network delay for UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { interest, usage, literacy, ethics } = scores;
  
  // High ethics focus
  if (ethics >= 18 && ethics >= Math.max(interest, usage, literacy)) {
    return STATIC_PROFILES.GUARDIAN;
  }
  
  // High balance (Master) - considering max scores are around 16-24
  if (interest >= 18 && usage >= 12 && literacy >= 15 && ethics >= 15) {
    return STATIC_PROFILES.MASTER;
  }

  // Determine dominant category using normalized weight (since max scores differ)
  const weights = {
    EXPLORER: interest / 24,
    NINJA: usage / 16,
    SAGE: literacy / 20,
    GUARDIAN: ethics / 20
  };

  const dominant = Object.entries(weights).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  return STATIC_PROFILES[dominant as keyof typeof STATIC_PROFILES] || STATIC_PROFILES.PIONEER;
}

