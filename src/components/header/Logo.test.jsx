import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('Logo 컴포넌트', () => {
  describe('렌더링', () => {
    it('현재 구현된 로고 렌더링을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 로고 요소들이 렌더링됨
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
    });

    it('현재 구현된 링크 속성을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 링크 속성 확인
      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
      expect(logoLink).toHaveClass('flex', 'items-center');
    });
  });

  describe('이미지 요소', () => {
    it('현재 구현된 로고 이미지 속성을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 이미지 속성 확인
      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveAttribute('alt', 'Logo');
      expect(logoImage).toHaveAttribute('src');
      expect(logoImage).toHaveClass('h-8', 'mr-3');
    });

    it('현재 구현된 이미지 소스를 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 이미지 소스 확인
      const logoImage = screen.getByAltText('Logo');
      const imageSrc = logoImage.getAttribute('src');
      
      // 현재 구현에서는 assets/brand-logo.png를 사용
      expect(imageSrc).toBeTruthy();
      // 빌드 시스템에 의해 경로가 변경될 수 있으므로 존재 여부만 확인
    });
  });

  describe('텍스트 요소', () => {
    it('현재 구현된 로고 텍스트 스타일을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 텍스트 스타일 확인
      const logoText = screen.getByText('Twitter');
      expect(logoText).toHaveClass(
        'self-center',
        'text-3xl',
        'font-semibold',
        'whitespace-nowrap'
      );
    });

    it('현재 구현된 로고 텍스트 내용을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 텍스트 내용 확인
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      
      // 정확한 텍스트 내용 확인
      const logoText = screen.getByText('Twitter');
      expect(logoText.textContent).toBe('Twitter');
    });
  });

  describe('레이아웃 구조', () => {
    it('현재 구현된 Flexbox 레이아웃을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      const { container } = render(<Logo />);

      // Then: 현재 구현된 Flexbox 구조 확인
      const logoLink = container.querySelector('a');
      expect(logoLink).toHaveClass('flex', 'items-center');
      
      // 플렉스 컨테이너 안의 요소들 확인
      const image = logoLink?.querySelector('img');
      const text = logoLink?.querySelector('span');
      
      expect(image).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it('현재 구현된 요소 순서를 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      const { container } = render(<Logo />);

      // Then: 현재 구현된 요소 순서 확인 (이미지 -> 텍스트)
      const logoLink = container.querySelector('a');
      const children = logoLink?.children;
      
      expect(children).toHaveLength(2);
      expect(children?.[0].tagName).toBe('IMG');
      expect(children?.[1].tagName).toBe('SPAN');
    });
  });

  describe('현재 구현 특성 문서화', () => {
    it('DOCUMENTED: 하드코딩된 href="/" 현재 구현', () => {
      // 현재 Logo 컴포넌트에서 href가 "/"로 하드코딩되어 있음
      // 이는 홈페이지로의 고정 링크
      
      render(<Logo />);

      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
      
      // 현재 구현은 적절함 (로고는 일반적으로 홈페이지 링크)
    });

    it('DOCUMENTED: assets 폴더 이미지 경로 현재 구현', () => {
      // 현재 구현에서는 assets/brand-logo.png 경로 사용
      // import 문을 통해 정적 이미지 불러오기
      
      render(<Logo />);

      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveAttribute('src');
      
      // 현재 구현은 적절함 (정적 이미지 처리)
      // TODO: 이미지 최적화 고려 (WebP, 반응형 이미지 등)
      // 관련 이슈: 별도 작업으로 관리
    });

    it('DOCUMENTED: 간단한 alt 텍스트 현재 구현', () => {
      // 현재 구현에서는 alt="Logo"로 간단하게 설정
      
      render(<Logo />);

      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveAttribute('alt', 'Logo');
      
      // TODO: 더 구체적인 alt 텍스트 고려
      // 예: "Twitter 홈페이지로 이동" 또는 "Twitter 로고"
      // 관련 이슈: 접근성 개선 작업으로 관리
    });

    it('DOCUMENTED: Tailwind CSS 클래스 직접 사용 현재 구현', () => {
      // 현재 구현에서는 Tailwind CSS 클래스를 직접 사용
      // 디자인 시스템이나 CSS 변수 대신 유틸리티 클래스 사용
      
      render(<Logo />);

      const logoLink = screen.getByRole('link');
      const logoImage = screen.getByAltText('Logo');
      const logoText = screen.getByText('Twitter');
      
      // 현재 적용된 Tailwind 클래스들 확인
      expect(logoLink).toHaveClass('flex', 'items-center');
      expect(logoImage).toHaveClass('h-8', 'mr-3');
      expect(logoText).toHaveClass(
        'self-center',
        'text-3xl',
        'font-semibold',
        'whitespace-nowrap'
      );
      
      // 현재 구현은 Tailwind 사용법에 적합함
    });
  });

  describe('접근성', () => {
    it('현재 구현된 링크 접근성을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 접근성 확인
      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
      
      // 링크에 접근 가능한 텍스트가 포함되어 있는지 확인
      expect(logoLink).toHaveTextContent('Twitter');
    });

    it('현재 구현된 이미지 접근성을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 이미지 접근성 확인
      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveAttribute('alt', 'Logo');
      
      // alt 속성이 비어있지 않은지 확인
      expect(logoImage.getAttribute('alt')).not.toBe('');
    });

    it('현재 구현된 키보드 네비게이션 지원을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 키보드 접근성 확인
      const logoLink = screen.getByRole('link');
      
      // 링크가 포커스 가능한지 확인 (기본 a 태그 동작)
      expect(logoLink).toBeInTheDocument();
      expect(logoLink.tagName).toBe('A');
    });
  });

  describe('스타일 일관성', () => {
    it('현재 구현된 이미지 크기 설정을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 이미지 크기 클래스 확인
      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveClass('h-8');
      
      // h-8은 32px에 해당 (Tailwind 기준)
      // 적절한 헤더 로고 크기
    });

    it('현재 구현된 여백 설정을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 여백 클래스 확인
      const logoImage = screen.getByAltText('Logo');
      expect(logoImage).toHaveClass('mr-3');
      
      // mr-3은 12px 오른쪽 여백 (Tailwind 기준)
      // 이미지와 텍스트 사이 적절한 간격
    });

    it('현재 구현된 텍스트 스타일 조합을 테스트한다', () => {
      // Given & When: Logo 컴포넌트 렌더링
      render(<Logo />);

      // Then: 현재 구현된 텍스트 스타일 조합 확인
      const logoText = screen.getByText('Twitter');
      
      // 각 클래스의 의미:
      // self-center: 플렉스 아이템 중앙 정렬
      // text-3xl: 30px 텍스트 크기
      // font-semibold: 600 폰트 굵기
      // whitespace-nowrap: 텍스트 줄바꿈 방지
      expect(logoText).toHaveClass(
        'self-center',
        'text-3xl', 
        'font-semibold',
        'whitespace-nowrap'
      );
      
      // 브랜딩에 적합한 스타일 조합
    });
  });
});