import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage 컴포넌트', () => {
  describe('메시지 표시', () => {
    it('현재 구현된 에러 메시지 표시 동작을 테스트한다', () => {
      // Given: 에러 메시지
      const errorMessage = '필수 입력값입니다.';

      // When: ErrorMessage 컴포넌트 렌더링
      render(<ErrorMessage message={errorMessage} />);

      // Then: 현재 구현된 메시지 표시 확인
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('메시지가 없을 때 현재 구현된 동작을 테스트한다', () => {
      // Given: 메시지가 없는 경우
      
      // When: message prop 없이 렌더링
      const { container } = render(<ErrorMessage />);

      // Then: 현재 구현된 동작 확인 (빈 텍스트 표시)
      const errorElement = container.querySelector('p');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('');
    });

    it('undefined 메시지일 때 현재 구현된 동작을 테스트한다', () => {
      // Given: undefined 메시지
      
      // When: undefined message로 렌더링
      const { container } = render(<ErrorMessage message={undefined} />);

      // Then: 현재 구현된 동작 확인
      const errorElement = container.querySelector('p');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('');
    });

    it('빈 문자열 메시지일 때 현재 구현된 동작을 테스트한다', () => {
      // Given: 빈 문자열 메시지
      
      // When: 빈 문자열 message로 렌더링
      const { container } = render(<ErrorMessage message="" />);

      // Then: 현재 구현된 동작 확인
      const errorElement = container.querySelector('p');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('');
    });
  });

  describe('스타일링', () => {
    it('현재 구현된 CSS 클래스가 적용되어야 한다', () => {
      // Given: 에러 메시지
      const errorMessage = '에러가 발생했습니다.';

      // When: ErrorMessage 컴포넌트 렌더링
      render(<ErrorMessage message={errorMessage} />);

      // Then: 현재 구현된 Tailwind CSS 클래스 확인
      const errorElement = screen.getByText(errorMessage);
      expect(errorElement).toHaveClass('text-red-500', 'text-xs', 'italic');
    });

    it('현재 구현된 HTML 태그 구조를 테스트한다', () => {
      // Given: 에러 메시지
      const errorMessage = '유효성 검사 실패';

      // When: ErrorMessage 컴포넌트 렌더링
      render(<ErrorMessage message={errorMessage} />);

      // Then: 현재 구현된 p 태그 사용 확인
      const errorElement = screen.getByText(errorMessage);
      expect(errorElement.tagName).toBe('P');
    });
  });

  describe('다양한 메시지 타입', () => {
    const testMessages = [
      '필수 입력값입니다.',
      '이메일 형식이 올바르지 않습니다.',
      '비밀번호는 8자 이상이어야 합니다.',
      '사용자명은 영문자와 숫자만 가능합니다.',
      '유효한 URL을 입력해주세요.'
    ];

    testMessages.forEach((message, index) => {
      it(`메시지 ${index + 1}: 현재 구현된 "${message}" 표시를 테스트한다`, () => {
        // Given & When: 특정 메시지로 렌더링
        render(<ErrorMessage message={message} />);

        // Then: 현재 구현된 메시지 표시 확인
        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByText(message)).toHaveClass('text-red-500', 'text-xs', 'italic');
      });
    });
  });

  describe('특수 문자 및 HTML 메시지', () => {
    it('특수 문자가 포함된 메시지의 현재 구현된 처리를 테스트한다', () => {
      // Given: 특수 문자가 포함된 메시지
      const specialMessage = '에러: 입력값에 <script> 태그를 사용할 수 없습니다!';

      // When: 특수 문자 메시지로 렌더링
      render(<ErrorMessage message={specialMessage} />);

      // Then: 현재 구현된 특수 문자 처리 확인 (XSS 방지)
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
      // React는 기본적으로 텍스트를 escape하므로 안전함
    });

    it('긴 메시지의 현재 구현된 표시를 테스트한다', () => {
      // Given: 긴 에러 메시지
      const longMessage = '사용자명은 3자 이상 20자 이하의 영문자, 숫자, 언더스코어(_)만 사용할 수 있으며, 첫 글자는 반드시 영문자여야 합니다. 또한 이미 사용 중인 사용자명은 선택할 수 없습니다.';

      // When: 긴 메시지로 렌더링
      render(<ErrorMessage message={longMessage} />);

      // Then: 현재 구현된 긴 메시지 처리 확인
      expect(screen.getByText(longMessage)).toBeInTheDocument();
      expect(screen.getByText(longMessage)).toHaveClass('text-red-500', 'text-xs', 'italic');
    });
  });

  describe('접근성', () => {
    it('현재 구현된 접근성 특성을 테스트한다', () => {
      // Given: 에러 메시지
      const errorMessage = '접근성 테스트 메시지';

      // When: ErrorMessage 컴포넌트 렌더링
      render(<ErrorMessage message={errorMessage} />);

      // Then: 현재 구현된 접근성 특성 확인
      const errorElement = screen.getByText(errorMessage);
      
      // 현재는 특별한 접근성 속성이 없음 (문서화)
      expect(errorElement).not.toHaveAttribute('role');
      expect(errorElement).not.toHaveAttribute('aria-live');
      
      // TODO: 접근성 개선을 위해 role="alert" 또는 aria-live="polite" 추가 고려
      // 관련 이슈: 별도 작업으로 관리
    });
  });

  describe('현재 구현 특성 문서화', () => {
    it('DOCUMENTED: 항상 p 태그를 렌더링하는 현재 동작', () => {
      // 현재 구현에서는 message가 없어도 p 태그가 항상 렌더링됨
      // 이는 레이아웃 일관성을 위한 것으로 보임
      
      // When: 메시지 없이 렌더링
      const { container } = render(<ErrorMessage />);

      // Then: 현재 구현된 p 태그 항상 렌더링 확인
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
      expect(pElement).toHaveClass('text-red-500', 'text-xs', 'italic');
    });

    it('DOCUMENTED: Tailwind CSS 클래스 직접 사용하는 현재 구현', () => {
      // 현재 구현에서는 스타일을 위해 Tailwind CSS 클래스를 직접 사용
      // 테마나 디자인 시스템과의 일관성을 위해 CSS 변수 또는 컴포넌트 분리 고려 가능
      
      render(<ErrorMessage message="스타일 테스트" />);

      const errorElement = screen.getByText('스타일 테스트');
      
      // 현재 하드코딩된 클래스들 문서화
      expect(errorElement).toHaveClass(
        'text-red-500',  // 빨간색 텍스트
        'text-xs',       // 작은 폰트 크기
        'italic'         // 이탤릭체
      );
    });

    it('DOCUMENTED: TypeScript 타입 정의의 현재 구현', () => {
      // 현재 PropsType 인터페이스로 타입이 정의되어 있음
      // readonly 수식어 사용으로 불변성 보장
      
      // 타입 안전성 테스트
      render(<ErrorMessage message="타입 테스트" />);
      
      // TypeScript 컴파일 시점에 타입 체크되므로 런타임 테스트로는 한계가 있지만
      // 올바른 props 전달 확인
      expect(screen.getByText('타입 테스트')).toBeInTheDocument();
    });
  });

  describe('재사용성 테스트', () => {
    it('여러 ErrorMessage 컴포넌트가 동시에 렌더링되어야 한다', () => {
      // Given: 여러 에러 메시지
      const messages = [
        '첫 번째 에러',
        '두 번째 에러',
        '세 번째 에러'
      ];

      // When: 여러 ErrorMessage 컴포넌트 렌더링
      render(
        <div>
          {messages.map((message, index) => (
            <ErrorMessage key={index} message={message} />
          ))}
        </div>
      );

      // Then: 모든 메시지가 렌더링되어야 함
      messages.forEach(message => {
        expect(screen.getByText(message)).toBeInTheDocument();
      });
    });

    it('동적으로 메시지가 변경되는 현재 구현된 동작을 테스트한다', () => {
      // Given: 초기 메시지
      const initialMessage = '초기 에러 메시지';
      const updatedMessage = '업데이트된 에러 메시지';

      // When: 초기 렌더링
      const { rerender } = render(<ErrorMessage message={initialMessage} />);
      expect(screen.getByText(initialMessage)).toBeInTheDocument();

      // When: 메시지 업데이트
      rerender(<ErrorMessage message={updatedMessage} />);

      // Then: 현재 구현된 동적 업데이트 확인
      expect(screen.getByText(updatedMessage)).toBeInTheDocument();
      expect(screen.queryByText(initialMessage)).not.toBeInTheDocument();
    });
  });
});