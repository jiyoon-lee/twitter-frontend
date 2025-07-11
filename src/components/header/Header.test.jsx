import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// 테스트용 라우터 래퍼
function RouterWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('Header 컴포넌트', () => {
  describe('렌더링', () => {
    it('현재 구현된 헤더 렌더링을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 기본 요소들이 렌더링됨
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('현재 구현된 네비게이션 구조를 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 nav 태그와 CSS 클래스 확인
      const navElement = container.querySelector('nav');
      expect(navElement).toHaveClass(
        'border-gray-200',
        'bg-header',
        'rounded-lg'
      );
    });

    it('현재 구현된 반응형 레이아웃 구조를 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 반응형 컨테이너 클래스 확인
      const containerDiv = container.querySelector('.max-w-screen-xl');
      expect(containerDiv).toHaveClass(
        'max-w-screen-xl',
        'flex',
        'flex-wrap',
        'items-center',
        'justify-between',
        'mx-auto',
        'p-4'
      );
    });
  });

  describe('Logo 컴포넌트 통합', () => {
    it('현재 구현된 Logo 컴포넌트 렌더링을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: Logo 컴포넌트가 포함된 현재 구조 확인
      const logoLinks = screen.getAllByRole('link');
      const logoLink = logoLinks.find(link => link.getAttribute('href') === '/');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveClass('flex', 'items-center');

      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveClass('h-8', 'mr-3');

      const logoText = screen.getByText('Twitter');
      expect(logoText).toHaveClass(
        'self-center',
        'text-3xl',
        'font-semibold',
        'whitespace-nowrap'
      );
    });

    it('현재 구현된 로고 이미지 속성을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 로고 이미지 속성 확인
      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveAttribute('alt', 'Logo');
      expect(logoImage).toHaveAttribute('src');
      // 이미지 경로는 빌드 시스템에 의해 변경될 수 있으므로 존재 여부만 확인
    });
  });

  describe('Navigator 컴포넌트 통합', () => {
    it('현재 구현된 Navigator 컴포넌트 렌더링을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: Navigator 컴포넌트가 포함된 현재 구조 확인
      expect(screen.getByText('All Tweets')).toBeInTheDocument();
      expect(screen.getByText('LOGIN')).toBeInTheDocument();
      
      // 현재 isSignin = false로 하드코딩되어 있어 로그인 상태 메뉴는 표시되지 않음
      expect(screen.queryByText('My Tweets')).not.toBeInTheDocument();
      expect(screen.queryByText('LOGOUT')).not.toBeInTheDocument();
    });

    it('현재 구현된 네비게이션 링크들을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 NavLink 요소들 확인
      const allTweetsLink = screen.getByRole('link', { name: 'All Tweets' });
      expect(allTweetsLink).toHaveAttribute('href', '/');

      const loginLink = screen.getByRole('link', { name: 'LOGIN' });
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('현재 구현된 반응형 네비게이션 스타일을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 반응형 클래스들 확인
      const navContainer = container.querySelector('#navbar-default');
      expect(navContainer).toHaveClass(
        'hidden',
        'w-full',
        'md:block',
        'md:w-auto'
      );

      const navList = container.querySelector('ul');
      expect(navList).toHaveClass(
        'font-medium',
        'flex',
        'flex-col',
        'p-4',
        'md:p-0',
        'mt-4',
        'border',
        'border-gray-100',
        'rounded-lg',
        'bg-gray-50',
        'md:flex-row',
        'md:space-x-8',
        'md:mt-0',
        'md:border-0',
        'md:bg-white',
        'dark:bg-gray-800',
        'md:dark:bg-gray-900',
        'dark:border-gray-700'
      );
    });
  });

  describe('현재 구현 특성 문서화', () => {
    it('DOCUMENTED: bg-header CSS 클래스 사용하는 현재 구현', () => {
      // 현재 nav 태그에 bg-header라는 커스텀 클래스가 적용되어 있음
      // 이는 Tailwind의 기본 클래스가 아닌 커스텀 CSS일 가능성이 높음
      
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      
      const navElement = container.querySelector('nav');
      expect(navElement).toHaveClass('bg-header');
      
      // TODO: bg-header 클래스가 정의되어 있는지 확인 필요
      // TODO: 표준 Tailwind 클래스 사용 고려 (예: bg-blue-500 등)
      // 관련 이슈: 별도 작업으로 관리
    });

    it('DOCUMENTED: Logo와 Navigator 컴포넌트 분리된 현재 구조', () => {
      // 현재 구현에서는 Header가 Logo와 Navigator를 별도 컴포넌트로 분리하여 사용
      // 이는 컴포넌트 재사용성과 관심사 분리에 도움이 됨
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      
      // Logo 부분
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      
      // Navigator 부분
      expect(screen.getByText('All Tweets')).toBeInTheDocument();
      expect(screen.getByText('LOGIN')).toBeInTheDocument();
      
      // 컴포넌트 분리로 인한 구조적 이점 확인됨
    });

    it('DOCUMENTED: flex와 justify-between으로 구현된 현재 레이아웃', () => {
      // 현재 구현에서는 Logo를 왼쪽, Navigator를 오른쪽에 배치하기 위해
      // flex와 justify-between 사용
      
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      
      const flexContainer = container.querySelector('.flex.justify-between');
      expect(flexContainer).toHaveClass(
        'flex',
        'flex-wrap',
        'items-center',
        'justify-between'
      );
      
      // 현재 레이아웃 구조가 올바르게 적용됨
    });

    it('DOCUMENTED: 하드코딩된 로그인 상태 현재 구현', () => {
      // Navigator 컴포넌트에서 isSignin = false로 하드코딩되어 있음
      // 실제 인증 상태와 연동되지 않는 상태
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );
      
      // 현재는 항상 비로그인 상태 메뉴만 표시
      expect(screen.getByText('LOGIN')).toBeInTheDocument();
      expect(screen.queryByText('LOGOUT')).not.toBeInTheDocument();
      expect(screen.queryByText('My Tweets')).not.toBeInTheDocument();
      
      // TODO: Redux 인증 상태와 연동 필요
      // TODO: useSelector를 사용하여 실제 로그인 상태 반영
      // 관련 이슈: 별도 작업으로 관리
    });
  });

  describe('접근성', () => {
    it('현재 구현된 시맨틱 HTML 구조를 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 시맨틱 요소들 확인
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // 링크 요소들 확인 (Logo + 네비게이션 링크들)
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(3); // Logo, All Tweets, LOGIN
    });

    it('현재 구현된 이미지 alt 속성을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 alt 속성 확인
      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toBeInTheDocument();
      
      // 현재는 간단한 "Logo" alt 텍스트 사용
      // TODO: 더 구체적인 alt 텍스트 고려 (예: "Twitter 로고")
      // 관련 이슈: 별도 작업으로 관리
    });
  });

  describe('통합 테스트', () => {
    it('현재 구현된 전체 헤더 레이아웃을 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 전체 구조 확인
      // 1. 최상위 nav 요소
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();

      // 2. 컨테이너 div
      const container_div = container.querySelector('.max-w-screen-xl');
      expect(container_div).toBeInTheDocument();

      // 3. Logo 영역 (왼쪽)
      const logoArea = screen.getByRole('link', { name: /Twitter/ });
      expect(logoArea).toBeInTheDocument();

      // 4. Navigator 영역 (오른쪽)
      const navArea = container.querySelector('#navbar-default');
      expect(navArea).toBeInTheDocument();

      // 5. 모든 요소가 올바른 계층 구조로 렌더링됨
      expect(nav.contains(container_div)).toBe(true);
      expect(container_div.contains(logoArea)).toBe(true);
      expect(container_div.contains(navArea)).toBe(true);
    });

    it('현재 구현된 반응형 동작 스타일 클래스를 테스트한다', () => {
      // Given & When: Header 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Then: 현재 구현된 반응형 클래스들이 모두 적용되었는지 확인
      const navContainer = container.querySelector('#navbar-default');
      
      // 모바일: hidden
      expect(navContainer).toHaveClass('hidden');
      
      // 태블릿 이상: md:block
      expect(navContainer).toHaveClass('md:block');
      
      // 네비게이션 리스트의 반응형 클래스들
      const navList = container.querySelector('ul');
      expect(navList).toHaveClass('flex-col', 'md:flex-row');
      expect(navList).toHaveClass('bg-gray-50', 'md:bg-white');
      
      // 현재 구현된 모든 반응형 클래스가 적절히 적용됨
    });
  });
});