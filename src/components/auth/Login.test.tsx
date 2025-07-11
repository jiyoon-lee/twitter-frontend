import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login 컴포넌트', () => {
  describe('렌더링', () => {
    it('현재 구현된 로그인 폼 렌더링을 테스트한다', () => {
      // Given & When: Login 컴포넌트 렌더링
      render(<Login />);

      // Then: 현재 구현된 모든 필드가 렌더링됨
      expect(screen.getByLabelText('UserName')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Url')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('현재 구현된 폼 스타일이 적용되어야 한다', () => {
      // Given & When: Login 컴포넌트 렌더링
      const { container } = render(<Login />);

      // Then: 현재 구현된 Tailwind CSS 클래스 확인
      const formElement = container.querySelector('form');
      expect(formElement).toHaveClass(
        'bg-white',
        'shadow-md',
        'rounded',
        'px-8',
        'pt-6',
        'pb-8'
      );
    });
  });

  describe('폼 필드', () => {
    it('현재 구현된 모든 Input 컴포넌트의 속성을 테스트한다', () => {
      // Given & When: Login 컴포넌트 렌더링
      render(<Login />);

      // Then: 각 필드의 현재 구현된 속성 확인
      const usernameInput = screen.getByLabelText('UserName');
      const passwordInput = screen.getByLabelText('Password');
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const urlInput = screen.getByLabelText('Url');

      // 현재 모든 필드가 type="text"로 구현됨
      [usernameInput, passwordInput, nameInput, emailInput, urlInput].forEach(input => {
        expect(input).toHaveAttribute('type', 'text');
      });

      // ID 속성 확인
      expect(usernameInput).toHaveAttribute('id', 'username');
      expect(passwordInput).toHaveAttribute('id', 'password');
      expect(nameInput).toHaveAttribute('id', 'name');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(urlInput).toHaveAttribute('id', 'url');
    });
  });

  describe('사용자 상호작용', () => {
    it('현재 구현된 필드별 입력 동작을 테스트한다', () => {
      // Given: Login 컴포넌트 렌더링
      render(<Login />);

      const usernameInput = screen.getByLabelText('UserName');
      const passwordInput = screen.getByLabelText('Password');
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const urlInput = screen.getByLabelText('Url');

      // When: 각 필드에 데이터 입력
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(nameInput, { target: { value: '테스트 사용자' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });

      // Then: 현재 구현된 입력 동작 확인
      expect(usernameInput).toHaveValue('testuser');
      expect(passwordInput).toHaveValue('password123');
      expect(nameInput).toHaveValue('테스트 사용자');
      expect(emailInput).toHaveValue('test@example.com');
      expect(urlInput).toHaveValue('https://example.com');
    });

    it('현재 구현된 폼 제출 동작을 테스트한다', () => {
      // Given: console.log 모킹
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<Login />);
      
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // When: 제출 버튼 클릭
      fireEvent.click(submitButton);

      // Then: 현재 구현된 제출 동작 확인 (console.log("몰라"))
      expect(consoleSpy).toHaveBeenCalledWith('몰라');
      
      consoleSpy.mockRestore();
    });
  });

  describe('React Hook Form 통합', () => {
    it('현재 구현된 FormProvider 사용을 테스트한다', () => {
      // Given & When: Login 컴포넌트 렌더링
      render(<Login />);

      // Then: React Hook Form이 제공하는 기능들이 동작하는지 확인
      // 모든 input이 register되어 있는지 name 속성으로 확인
      expect(screen.getByLabelText('UserName')).toHaveAttribute('name', 'username');
      expect(screen.getByLabelText('Password')).toHaveAttribute('name', 'password');
      expect(screen.getByLabelText('Name')).toHaveAttribute('name', 'name');
      expect(screen.getByLabelText('Email')).toHaveAttribute('name', 'email');
      expect(screen.getByLabelText('Url')).toHaveAttribute('name', 'url');
    });
  });

  describe('현재 구현 특성 문서화', () => {
    it('DOCUMENTED: 모든 필드가 type="text"로 구현된 현재 동작', () => {
      // 현재 구현에서는 password 필드도 type="text"로 렌더링됨
      // 보안상 문제가 있을 수 있지만 기존 동작을 그대로 문서화
      
      render(<Login />);

      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('type', 'text');
      
      // TODO: 보안 개선을 위해 password 필드는 type="password"로 변경 필요
      // TODO: email 필드는 type="email", url 필드는 type="url"로 변경 고려
      // 관련 이슈: 별도 작업으로 관리
    });

    it('DOCUMENTED: console.log로 구현된 현재 제출 로직', () => {
      // 현재 구현에서는 실제 로그인 로직 대신 console.log("몰라")만 실행됨
      // 실제 API 호출이나 상태 업데이트가 없음
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<Login />);
      
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      // 현재 구현된 제출 로직 확인
      fireEvent.click(submitButton);
      expect(consoleSpy).toHaveBeenCalledWith('몰라');
      
      // TODO: 실제 로그인 API 호출 및 Redux 상태 업데이트 구현 필요
      // TODO: 로그인 성공/실패에 대한 사용자 피드백 구현 필요
      // 관련 이슈: 별도 작업으로 관리
      
      consoleSpy.mockRestore();
    });

    it('DOCUMENTED: 5개 필드를 모두 포함하는 현재 폼 구조', () => {
      // 현재 구현에서는 로그인 폼에 username, password 외에
      // name, email, url 필드도 포함되어 있음
      // 일반적인 로그인 폼보다 많은 필드를 요구함
      
      render(<Login />);

      // 현재 폼에 포함된 모든 필드 확인
      expect(screen.getByLabelText('UserName')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();     // 추가 필드
      expect(screen.getByLabelText('Email')).toBeInTheDocument();    // 추가 필드
      expect(screen.getByLabelText('Url')).toBeInTheDocument();      // 추가 필드
      
      // TODO: 사용자 경험 개선을 위해 로그인/회원가입 폼 분리 고려
      // TODO: 필수 필드와 선택 필드 구분 고려
      // 관련 이슈: 별도 작업으로 관리
    });
  });
});