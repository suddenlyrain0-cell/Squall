import type { EventItem, Notice, Post, UpdateNote } from "@/types/community";

export const notices: Notice[] = [
  {
    id: "n-001",
    title: "SQUALL Community Hub 베타 오픈 안내",
    type: "general",
    date: "2026.06.17",
    pinned: true,
    excerpt: "공식 공지, 업데이트, 이벤트, 게시판을 한곳에서 만나는 첫 번째 허브가 열렸습니다."
  },
  {
    id: "n-002",
    title: "Alpha Build 1.0.3 밸런스 조정 예정",
    type: "update",
    date: "2026.06.15",
    excerpt: "전투 템포, 초반 보상, 일부 스킬 판정이 조정됩니다."
  },
  {
    id: "n-003",
    title: "주말 커뮤니티 플레이 이벤트",
    type: "event",
    date: "2026.06.14",
    excerpt: "스크린샷과 공략을 공유하면 추첨을 통해 특별 배지를 지급합니다."
  },
  {
    id: "n-004",
    title: "서버 안정화 점검 안내",
    type: "maintenance",
    date: "2026.06.13",
    excerpt: "더 안정적인 테스트 환경을 위해 새벽 시간대 짧은 점검이 진행됩니다."
  }
];

export const posts: Post[] = [
  {
    id: "p-001",
    title: "초반 20분 성장 루트 정리해봤습니다",
    category: "guide",
    tag: "공략",
    author: "StormRunner",
    avatar: "SR",
    date: "방금 전",
    views: 1842,
    comments: 38,
    likes: 126,
    excerpt: "초반 아이템 선택과 전투 회피 타이밍을 기준으로 루트를 나눠봤습니다."
  },
  {
    id: "p-002",
    title: "이번 패치 이후 타격감이 훨씬 좋아졌네요",
    category: "free",
    tag: "자유",
    author: "OrangeBolt",
    avatar: "OB",
    date: "12분 전",
    views: 982,
    comments: 21,
    likes: 88,
    excerpt: "사운드와 카메라 피드백이 좋아져서 전투가 더 선명하게 느껴집니다."
  },
  {
    id: "p-003",
    title: "보스 2페이즈에서 충돌 판정 이슈가 있습니다",
    category: "bug",
    tag: "버그",
    author: "QA_Player",
    avatar: "QP",
    date: "28분 전",
    views: 441,
    comments: 9,
    likes: 34,
    excerpt: "벽 근처에서 회피하면 캐릭터가 순간적으로 끼이는 현상이 재현됩니다."
  },
  {
    id: "p-004",
    title: "길드형 소셜 기능도 나중에 들어오면 좋겠습니다",
    category: "suggestion",
    tag: "건의",
    author: "Linker",
    avatar: "LK",
    date: "1시간 전",
    views: 317,
    comments: 14,
    likes: 51,
    excerpt: "친구와 함께 목표를 공유하는 장치가 있으면 커뮤니티 체류가 늘어날 것 같습니다."
  },
  {
    id: "p-005",
    title: "팬아트: SQUALL 로고를 장비 문양처럼 그려봤어요",
    category: "fanart",
    tag: "팬아트",
    author: "PixelForge",
    avatar: "PF",
    date: "2시간 전",
    views: 763,
    comments: 27,
    likes: 112,
    excerpt: "오렌지 번개 실루엣을 방패 엠블럼 느낌으로 재해석했습니다."
  }
];

export const updateNotes: UpdateNote[] = [
  {
    version: "Version 1.0.3",
    date: "2026.06.15",
    summary: "전투 흐름과 초반 플레이 경험을 다듬는 패치입니다.",
    items: ["신규 튜토리얼 카드 추가", "초반 보상 밸런스 조정", "보스 충돌 판정 일부 수정"]
  },
  {
    version: "Version 1.0.2",
    date: "2026.06.08",
    summary: "커뮤니티 피드백을 반영한 안정화 업데이트입니다.",
    items: ["로딩 시간 단축", "컨트롤러 입력 안정화", "일부 UI 텍스트 개선"]
  },
  {
    version: "Version 1.0.1",
    date: "2026.06.01",
    summary: "첫 공개 테스트 이후 발견된 주요 문제를 수정했습니다.",
    items: ["세이브 데이터 오류 수정", "스킬 쿨다운 표시 개선", "사운드 믹싱 조정"]
  }
];

export const events: EventItem[] = [
  {
    id: "e-001",
    title: "첫 공략 공유 챌린지",
    status: "ongoing",
    period: "2026.06.17 - 2026.06.30",
    description: "나만의 성장 루트나 보스 공략을 올리고 공식 커뮤니티 배지를 받아가세요."
  },
  {
    id: "e-002",
    title: "베스트 팬아트 쇼케이스",
    status: "ongoing",
    period: "2026.06.20 - 2026.07.07",
    description: "SQUALL 세계관을 자유롭게 그려주세요. 선정작은 메인 허브에 소개됩니다."
  },
  {
    id: "e-003",
    title: "알파 테스트 설문 이벤트",
    status: "ended",
    period: "2026.05.20 - 2026.06.05",
    description: "초기 테스트 의견을 남겨준 플레이어에게 감사 보상을 지급했습니다."
  }
];
