# FIFA World Cup 2026 Simulator

48팀 확장 포맷의 2026 FIFA 월드컵을 시뮬레이션하는 팬 메이드 웹 앱입니다.  
조별리그 순위, 32강 대진표, 라이브 스코어, 경기 일정을 한곳에서 확인할 수 있습니다.

🔗 **라이브 사이트:** https://taetegwgn.github.io/fifa-worldcup-2026/

> Fan-made · Unofficial · FIFA와 무관합니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 📊 **대시보드** | 라이브 경기, 조별 현황 한눈에 보기 |
| 📋 **조별리그** | 드래그로 순위 조정, 실시간 순위 변동 표시 |
| 🏆 **토너먼트** | 32강~결승 브라켓, 자동 예측 |
| 🇰🇷 **경우의 수** | 선택한 팀 기준 진출 시나리오 |
| 📅 **경기 일정** | 104경기 전체 일정, 국가별 필터, LIVE 표시 |
| 🌐 **다국어** | 한국 선택 시 한국어, 그 외 영어 |
| ⚡ **라이브 연동** | [worldcup26.ir](https://worldcup26.ir) API, 30초 자동 갱신 |

---

## 32강 대진 규칙

32강 대진은 **랜덤이 아닙니다.** FIFA가 정한 고정 브라켓 규칙을 따릅니다.

```
48팀 → 12개 조 (A~L)
  ├─ 각 조 1·2위 → 24팀 (자동 32강)
  └─ 각 조 3위 중 상위 8팀 → 8팀 (승점→득실차→다득점)
       ─────────────────
              32팀 → 32강 (16경기) → 16강 → 8강 → 준결승 → 결승
```

- **조 1·2위 대진:** FIFA 고정 슬롯 (예: M73 = 2A vs 2B)
- **3위팀 8팀:** Annex C 규칙으로 허용된 조 조합 안에서 자동 배정
- **16강 이후:** 승자 따라 완전 고정 경로 (예: M89 = W73 vs W75)

### 상세 문서 & 인터랙티브 시연

| 리소스 | 링크 |
|--------|------|
| 📖 **인터랙티브 가이드** | [bracket-guide.html](https://taetegwgn.github.io/fifa-worldcup-2026/bracket-guide.html) |
| 📄 **상세 Markdown** | [docs/round-of-32-bracket.md](docs/round-of-32-bracket.md) |

인터랙티브 가이드에서 3위팀 승점을 조작하며 Annex C 배정 결과를 직접 확인할 수 있습니다.

---

## 프로젝트 구조

```
fifa-worldcup-2026/
├── index.html                  # 메인 앱
├── bracket-guide.html          # 32강 대진 가이드 (인터랙티브)
├── docs/
│   └── round-of-32-bracket.md  # 32강 규칙 상세 문서
├── css/
│   ├── main.css
│   ├── base/                   # 변수, 리셋
│   ├── layout/                 # 헤더, 반응형
│   ├── components/             # 공통 컴포넌트
│   └── views/                  # 탭별 스타일
├── js/
│   ├── config/                 # 상수, 기본 데이터, 정적 일정
│   ├── api/                    # 라이브 API 연동
│   ├── logic/                  # 순위·브라켓 계산
│   ├── render/                 # UI 렌더링
│   ├── events/                 # 이벤트·초기화
│   ├── country/                # 국가 선택·시간대
│   ├── i18n/                   # 다국어
│   ├── guide/                  # 가이드 페이지 로직
│   └── utils/                  # 헬퍼 함수
└── .github/workflows/          # GitHub Pages 배포
```

---

## 로컬 실행

별도 빌드 없이 정적 파일로 동작합니다.

```bash
git clone https://github.com/taetegwgn/fifa-worldcup-2026.git
cd fifa-worldcup-2026

# Python
python3 -m http.server 8080

# 또는 Node.js
npx serve .
```

브라우저에서 `http://localhost:8080` 접속

---

## API

라이브 데이터는 [worldcup26.ir](https://worldcup26.ir)에서 가져옵니다.

| 엔드포인트 | 내용 |
|-----------|------|
| `/get/teams` | 팀 정보, 국기 |
| `/get/groups` | 조별 순위 |
| `/get/games` | 경기 결과, LIVE 상태 |
| `/get/stadiums` | 경기장 정보 |

경기 일정은 `schedule-static.js`에 정적 데이터로 미리 로드되어 API 응답 전에도 즉시 표시됩니다.

---

## 기술 스택

- HTML / CSS / Vanilla JavaScript (프레임워크 없음)
- GitHub Pages 배포
- `Intl.DateTimeFormat` 기반 시스템 시간대 변환
- localStorage 캐싱

---

## 라이선스 & 면책

이 프로젝트는 개인 팬 프로젝트입니다. FIFA 공식 서비스가 아니며, FIFA 상표를 사용하지 않습니다.

Made with ❤️ by **Taegwan Kim**
