# MOLT BOX

**시각적 인터랙션과 애니메이션 기반의 UI 컴포넌트를 실험하고 수집하는 개인 프로젝트입니다.**  
컴포넌트의 기능성보다 시각적 표현과 인터페이스의 다양성에 초점을 맞추고 있습니다.

## 🎯 목적

- 다양한 애니메이션, 레이아웃, 인터랙션 실험
- 실사용보다는 **시각적 아이디어 저장소** 역할
- 프론트엔드 개발자 개인 실험

## 🔧 기술 스택

- React + TypeScript
- SCSS / Tailwind CSS
- Framer Motion
- Vite

## Cascading Card

스크롤 애니메이션이 적용된 수직 카드 스택 UI 컴포넌트입니다.  
카드는 시간차를 두고 부드럽게 흘러내리며, 각 `container`는 독립적으로 애니메이션됩니다.

- **개별 카드 컨테이너마다 animation delay / duration 다르게 적용**
- **hover 시 해당 카드 컨테이너의 애니메이션만 멈춤**
- **상/하단 영역에 `blur mask` 처리로 시각적 깊이감 제공**

**인터랙티브한 콘텐츠 리스트, 팀 소개, 블로그 카드 등 다양한 연출에 활용 가능합니다.**

![Cascading Card Demo](./assets/gif/cascading-card.gif)
