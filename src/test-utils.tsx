import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../app/api/apiSlice';

// 테스트용 Redux 스토어 생성
export const createTestStore = (preloadedState?: any) => {
  const reducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  });

  return configureStore({
    reducer: reducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });
};

// 완전한 앱 Provider 래퍼 (Redux + Router)
interface AppProvidersProps {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
  initialEntries?: string[];
}

export function AppProviders({ 
  children, 
  store, 
  initialEntries = ['/'] 
}: AppProvidersProps) {
  const testStore = store || createTestStore();
  
  return (
    <Provider store={testStore}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
}

// 라우터만 필요한 경우
export function RouterWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

// 테스트 상태 헬퍼들
export const testStates = {
  // 초기 인증 상태
  initialAuth: {
    auth: {
      username: null,
      token: null,
      name: null
    }
  },
  
  // 로그인된 사용자 상태
  authenticatedUser: {
    auth: {
      username: 'testuser',
      token: 'mock-jwt-token',
      name: '테스트 사용자'
    }
  },
  
  // 관리자 사용자 상태
  adminUser: {
    auth: {
      username: 'admin',
      token: 'admin-jwt-token',
      name: '관리자'
    }
  }
};

// 폼 데이터 모킹 헬퍼들
export const mockFormData = {
  validLoginData: {
    username: 'testuser',
    password: 'validpassword',
    name: '테스트 사용자',
    email: 'test@example.com',
    url: 'https://test.com'
  },
  
  invalidLoginData: {
    username: '',
    password: '',
    name: '',
    email: 'invalid-email',
    url: 'invalid-url'
  }
};

// 공통 테스트 유틸리티들
export const testUtils = {
  // DOM 요소 대기
  waitForElement: (callback: () => void, timeout = 1000) => {
    return new Promise(resolve => setTimeout(() => {
      callback();
      resolve(true);
    }, timeout));
  },
  
  // 콘솔 스파이 생성
  createConsoleSpy: () => {
    return jest.spyOn(console, 'log').mockImplementation();
  },
  
  // 에러 콘솔 스파이 생성
  createErrorSpy: () => {
    return jest.spyOn(console, 'error').mockImplementation();
  }
};

// 접근성 테스트 헬퍼들
export const a11yUtils = {
  // 키보드 네비게이션 테스트
  testKeyboardNavigation: (element: HTMLElement) => {
    // Tab 키 시뮬레이션
    element.focus();
    expect(element).toHaveFocus();
  },
  
  // ARIA 속성 검증
  checkAriaAttributes: (element: HTMLElement, expectedAttributes: Record<string, string>) => {
    Object.entries(expectedAttributes).forEach(([attr, value]) => {
      expect(element).toHaveAttribute(attr, value);
    });
  },
  
  // 스크린 리더 호환성 검증
  checkScreenReaderCompatibility: (element: HTMLElement) => {
    // role, aria-label, aria-describedby 등 확인
    const hasAccessibleName = 
      element.hasAttribute('aria-label') ||
      element.hasAttribute('aria-labelledby') ||
      element.textContent;
    
    expect(hasAccessibleName).toBeTruthy();
  }
};

// 스타일 테스트 헬퍼들
export const styleUtils = {
  // Tailwind 클래스 검증
  checkTailwindClasses: (element: HTMLElement, expectedClasses: string[]) => {
    expectedClasses.forEach(className => {
      expect(element).toHaveClass(className);
    });
  },
  
  // 반응형 클래스 검증
  checkResponsiveClasses: (element: HTMLElement, responsiveMap: Record<string, string[]>) => {
    Object.entries(responsiveMap).forEach(([breakpoint, classes]) => {
      classes.forEach(className => {
        if (breakpoint === 'mobile') {
          expect(element).toHaveClass(className);
        } else {
          expect(element).toHaveClass(`${breakpoint}:${className}`);
        }
      });
    });
  }
};

// 에러 상태 모킹
export const createErrorResponse = (message: string, status = 400) => ({
  success: false,
  error: message,
  status
});

// 성공 응답 모킹
export const createSuccessResponse = (data: any) => ({
  success: true,
  data
});

// 테스트 성능 측정
export const performanceUtils = {
  // 렌더링 시간 측정
  measureRenderTime: async (renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    return end - start;
  },
  
  // 메모리 사용량 체크 (Node.js 환경)
  checkMemoryUsage: () => {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage();
    }
    return null;
  }
};

// 디버깅 헬퍼들
export const debugUtils = {
  // DOM 트리 출력
  logDOMTree: (container: HTMLElement) => {
    console.log(container.innerHTML);
  },
  
  // 컴포넌트 props 로깅
  logProps: (props: Record<string, any>) => {
    console.log('Component Props:', props);
  },
  
  // 테스트 실행 시간 로깅
  logTestDuration: (testName: string, duration: number) => {
    console.log(`Test "${testName}" completed in ${duration}ms`);
  }
};

// 재사용 가능한 테스트 케이스들
export const commonTestCases = {
  // 접근성 기본 검사
  testBasicAccessibility: (getElement: () => HTMLElement) => {
    return {
      'should be keyboard accessible': () => {
        const element = getElement();
        a11yUtils.testKeyboardNavigation(element);
      },
      'should have proper ARIA attributes': () => {
        const element = getElement();
        a11yUtils.checkScreenReaderCompatibility(element);
      }
    };
  },
  
  // 스타일링 기본 검사
  testBasicStyling: (getElement: () => HTMLElement, expectedClasses: string[]) => {
    return {
      'should have correct CSS classes': () => {
        const element = getElement();
        styleUtils.checkTailwindClasses(element, expectedClasses);
      }
    };
  }
};