import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';
import { LoginFormInput } from './Login';

// 테스트용 폼 래퍼 컴포넌트
function TestFormWrapper({ 
  children, 
  defaultValues = {} 
}: { 
  children: React.ReactNode;
  defaultValues?: Partial<LoginFormInput>;
}) {
  const methods = useForm<LoginFormInput>({ defaultValues });
  
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}

describe('Input 컴포넌트', () => {
  const defaultProps = {
    type: 'username' as keyof LoginFormInput,
    label: 'UserName',
    errorMsg: '필수 입력값입니다.'
  };

  describe('렌더링', () => {
    it('현재 구현된 기본 렌더링을 테스트한다', () => {
      // Given & When: Input 컴포넌트 렌더링
      render(
        <TestFormWrapper>
          <Input {...defaultProps} />
        </TestFormWrapper>
      );

      // Then: 현재 구현된 요소들이 렌더링됨
      expect(screen.getByLabelText('UserName')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('UserName')).toBeInTheDocument();
    });

    it('전달받은 props가 올바르게 적용되어야 한다', () => {
      // Given: 다양한 props
      const props = {
        type: 'email' as keyof LoginFormInput,
        label: 'Email Address',
        errorMsg: '이메일을 입력해주세요.'
      };

      // When: Input 컴포넌트 렌더링
      render(
        <TestFormWrapper>
          <Input {...props} />
        </TestFormWrapper>
      );

      // Then: 현재 구현된 prop 적용 확인
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'email');
    });
  });

  describe('사용자 입력', () => {
    it('현재 구현된 텍스트 입력 동작을 테스트한다', () => {
      // Given: Input 컴포넌트 렌더링
      render(
        <TestFormWrapper>
          <Input {...defaultProps} />
        </TestFormWrapper>
      );

      const input = screen.getByRole('textbox');

      // When: 사용자가 텍스트 입력
      fireEvent.change(input, { target: { value: 'testuser' } });

      // Then: 현재 구현된 입력 동작 확인
      expect(input).toHaveValue('testuser');
    });

    it('입력 필드 포커스 시 현재 구현된 스타일이 적용되어야 한다', () => {
      // Given: Input 컴포넌트 렌더링
      render(
        <TestFormWrapper>
          <Input {...defaultProps} />
        </TestFormWrapper>
      );

      const input = screen.getByRole('textbox');

      // When: 입력 필드에 포커스
      fireEvent.focus(input);

      // Then: 현재 구현된 CSS 클래스 확인
      expect(input).toHaveClass(
        'shadow',
        'appearance-none', 
        'border',
        'rounded',
        'w-full',
        'py-2',
        'px-3',
        'text-gray-700',
        'leading-tight',
        'focus:outline-none',
        'focus:shadow-outline'
      );
    });
  });

  describe('접근성', () => {
    it('현재 구현된 접근성 속성을 테스트한다', () => {
      // Given & When: Input 컴포넌트 렌더링
      render(
        <TestFormWrapper>
          <Input {...defaultProps} />
        </TestFormWrapper>
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByText('UserName');

      // Then: 현재 구현된 접근성 속성 확인
      expect(label).toHaveAttribute('for', 'username');
      expect(input).toHaveAttribute('id', 'username');
      expect(input).toHaveAttribute('aria-invalid', 'false'); // 초기 상태
    });
  });

  describe('현재 구현 특성 문서화', () => {
    it('DOCUMENTED: 모든 input type이 text로 렌더링되는 현재 동작', () => {
      // 현재 구현에서는 password, email 등의 type도 모두 type="text"로 렌더링됨
      // 이는 보안상 문제가 될 수 있지만, 기존 동작을 그대로 테스트로 문서화
      
      render(
        <TestFormWrapper>
          <Input type="password" label="Password" errorMsg="필수값" />
        </TestFormWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      
      // TODO: 보안 개선을 위해 password type은 type="password"로 변경 필요
      // 관련 이슈: 별도 작업으로 관리
    });
  });
});