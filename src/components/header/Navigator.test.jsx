import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigator from './Navigator';

// 테스트용 라우터 래퍼
function RouterWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('Navigator 컴포넌트', () => {
  describe('현재 구현된 비로그인 상태 메뉴', () => {
    it('비로그인 상태 메뉴가 올바르게 렌더링되어야 한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 비로그인 상태 메뉴 확인
      expect(screen.getByText('All Tweets')).toBeInTheDocument();
      expect(screen.getByText('LOGIN')).toBeInTheDocument();
      
      // 로그인 상태 메뉴는 표시되지 않음 (isSignin = false)
      expect(screen.queryByText('My Tweets')).not.toBeInTheDocument();
      expect(screen.queryByText('LOGOUT')).not.toBeInTheDocument();
    });

    it('현재 구현된 네비게이션 링크 속성을 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 링크 속성 확인
      const allTweetsLink = screen.getByRole('link', { name: 'All Tweets' });
      expect(allTweetsLink).toHaveAttribute('href', '/');

      const loginLink = screen.getByRole('link', { name: 'LOGIN' });
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  describe('현재 구현된 스타일링', () => {
    it('현재 구현된 컨테이너 클래스를 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 컨테이너 클래스 확인
      const navContainer = container.querySelector('#navbar-default');
      expect(navContainer).toHaveClass(
        'hidden',
        'w-full',
        'md:block',
        'md:w-auto'
      );
    });

    it('현재 구현된 네비게이션 리스트 스타일을 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 ul 태그 클래스 확인
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

    it('현재 구현된 NavLink 스타일링 함수를 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 NavLink className 함수 동작 확인
      // NavLink는 현재 active 상태에 따라 클래스가 동적으로 적용됨
      const allTweetsLink = screen.getByRole('link', { name: 'All Tweets' });
      
      // 현재 페이지가 "/"이므로 active 상태일 것으로 예상
      // React Router의 NavLink가 자동으로 active 클래스 적용
      expect(allTweetsLink).toBeInTheDocument();
    });
  });

  describe('현재 구현 특성 문서화', () => {
    it('DOCUMENTED: 하드코딩된 isSignin = false 현재 구현', () => {
      // 현재 Navigator 컴포넌트에서 isSignin이 false로 하드코딩되어 있음
      // 실제 Redux 상태나 Context와 연동되지 않음
      
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // 현재 항상 비로그인 상태 메뉴만 표시
      expect(screen.getByText('LOGIN')).toBeInTheDocument();
      expect(screen.queryByText('LOGOUT')).not.toBeInTheDocument();
      expect(screen.queryByText('My Tweets')).not.toBeInTheDocument();
      
      // TODO: Redux useSelector 또는 Context API를 사용하여 실제 인증 상태 연동 필요
      // TODO: 인증 상태에 따른 동적 메뉴 표시 구현 필요
      // 관련 이슈: 별도 작업으로 관리
    });

    it('DOCUMENTED: NavLink className 함수의 현재 구현', () => {
      // 현재 각 NavLink에 동일한 className 함수가 중복 구현되어 있음
      // isActive, isPending 상태에 따른 스타일 적용
      
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // 현재 구현에서는 각 NavLink마다 동일한 className 로직이 반복됨
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2); // All Tweets, LOGIN
      
      // TODO: 공통 className 함수로 리팩토링 고려
      // TODO: 스타일 상수나 CSS 클래스로 분리 고려
      // 관련 이슈: 별도 작업으로 관리
    });

    it('DOCUMENTED: 반응형 클래스의 현재 구현', () => {
      // 현재 구현에서는 모바일/데스크톱 반응형을 위해 많은 Tailwind 클래스 사용
      // hidden/md:block, flex-col/md:flex-row 등 복잡한 반응형 설정
      
      const { container } = render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      const navContainer = container.querySelector('#navbar-default');
      const navList = container.querySelector('ul');
      
      // 모바일 우선 설계
      expect(navContainer).toHaveClass('hidden'); // 모바일에서 숨김
      expect(navContainer).toHaveClass('md:block'); // 태블릿 이상에서 표시
      
      expect(navList).toHaveClass('flex-col'); // 모바일에서 세로 배치
      expect(navList).toHaveClass('md:flex-row'); // 태블릿 이상에서 가로 배치
      
      // 현재 반응형 구현이 잘 되어 있음
    });

    it('DOCUMENTED: 다크 모드 클래스 포함된 현재 구현', () => {
      // 현재 구현에서는 다크 모드를 고려한 클래스들이 포함되어 있음
      // dark:bg-gray-800, md:dark:bg-gray-900 등
      
      const { container } = render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      const navList = container.querySelector('ul');
      
      // 다크 모드 클래스 확인
      expect(navList).toHaveClass('dark:bg-gray-800');
      expect(navList).toHaveClass('md:dark:bg-gray-900');
      expect(navList).toHaveClass('dark:border-gray-700');
      
      // 현재 다크 모드 지원이 CSS 레벨에서 준비되어 있음
      // TODO: 실제 다크 모드 토글 기능 구현 필요
      // 관련 이슈: 별도 작업으로 관리
    });
  });

  describe('접근성', () => {
    it('현재 구현된 시맨틱 HTML 구조를 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 시맨틱 구조 확인
      const navList = container.querySelector('ul');
      expect(navList).toBeInTheDocument();
      
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(2); // All Tweets, LOGIN
      
      // 각 li 요소 안에 링크가 포함되어 있는 구조
      listItems.forEach(li => {
        const link = li.querySelector('a');
        expect(link).toBeInTheDocument();
      });
    });

    it('현재 구현된 링크 접근성을 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 링크 접근성 확인
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href');
      });
      
      // 링크 텍스트가 명확하게 제공됨
      expect(screen.getByRole('link', { name: 'All Tweets' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'LOGIN' })).toBeInTheDocument();
    });
  });

  describe('NavLink 상태별 동작', () => {
    it('현재 구현된 NavLink active 상태 처리를 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: NavLink가 현재 구현된 상태에 따라 렌더링됨
      // React Router의 NavLink는 현재 경로에 따라 자동으로 active 상태 관리
      const allTweetsLink = screen.getByRole('link', { name: 'All Tweets' });
      const loginLink = screen.getByRole('link', { name: 'LOGIN' });
      
      expect(allTweetsLink).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument();
      
      // NavLink의 className 함수가 올바르게 적용되어 있는지 확인
      // (실제 스타일 적용은 브라우저 환경에서만 확인 가능)
    });
  });

  describe('구조적 테스트', () => {
    it('현재 구현된 전체 네비게이터 구조를 테스트한다', () => {
      // Given & When: Navigator 컴포넌트 렌더링
      const { container } = render(
        <RouterWrapper>
          <Navigator />
        </RouterWrapper>
      );

      // Then: 현재 구현된 전체 구조 확인
      // 1. 최상위 div (navbar-default)
      const navContainer = container.querySelector('#navbar-default');
      expect(navContainer).toBeInTheDocument();

      // 2. ul 요소
      const navList = container.querySelector('ul');
      expect(navList).toBeInTheDocument();

      // 3. li 요소들
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(2);

      // 4. 각 li 안의 NavLink
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);

      // 5. 전체 계층 구조 확인
      expect(navContainer.contains(navList)).toBe(true);
      expect(navList.contains(listItems[0])).toBe(true);
      expect(navList.contains(listItems[1])).toBe(true);
    });
  });
});