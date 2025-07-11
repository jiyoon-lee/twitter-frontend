import authReducer, { 
  setCredentials, 
  logOut, 
  selectCurrentUsername, 
  selectCurrentName, 
  selectCurrentToken 
} from '../../features/auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    username: null,
    token: null,
    name: null
  };

  const mockAuthData = {
    data: {
      username: 'testuser',
      name: '테스트 사용자',
      token: 'mock-jwt-token'
    }
  };

  describe('초기 상태', () => {
    it('초기 상태가 올바르게 설정되어야 한다', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('setCredentials action', () => {
    it('현재 구현된 인증 정보 설정 동작을 테스트한다', () => {
      // Given: 초기 상태
      const previousState = initialState;
      
      // When: setCredentials 액션 실행
      const actualState = authReducer(previousState, setCredentials(mockAuthData));
      
      // Then: 현재 구현된 상태 변화 확인
      expect(actualState.username).toBe('testuser');
      expect(actualState.name).toBe('테스트 사용자');
      expect(actualState.token).toBe('mock-jwt-token');
    });

    it('기존 인증 정보가 있을 때 새로운 정보로 덮어쓰기되어야 한다', () => {
      // Given: 기존 인증 정보가 있는 상태
      const previousState = {
        username: 'olduser',
        name: '기존 사용자',
        token: 'old-token'
      };

      // When: 새로운 인증 정보로 setCredentials 실행
      const actualState = authReducer(previousState, setCredentials(mockAuthData));

      // Then: 새로운 정보로 업데이트
      expect(actualState.username).toBe('testuser');
      expect(actualState.name).toBe('테스트 사용자');
      expect(actualState.token).toBe('mock-jwt-token');
    });
  });

  describe('logOut action', () => {
    it('현재 구현된 로그아웃 동작을 테스트한다', () => {
      // Given: 인증된 사용자 상태
      const previousState = {
        username: 'testuser',
        name: '테스트 사용자',
        token: 'mock-jwt-token'
      };

      // When: logOut 액션 실행
      const actualState = authReducer(previousState, logOut());

      // Then: 현재 구현된 상태 초기화 확인
      expect(actualState.username).toBeNull();
      expect(actualState.name).toBeNull();
      expect(actualState.token).toBeNull();
    });

    it('이미 로그아웃된 상태에서 logOut 실행 시 초기 상태를 유지해야 한다', () => {
      // Given: 이미 로그아웃된 상태
      const previousState = initialState;

      // When: logOut 액션 실행
      const actualState = authReducer(previousState, logOut());

      // Then: 초기 상태 유지
      expect(actualState).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    const mockRootState = {
      auth: {
        username: 'testuser',
        name: '테스트 사용자',
        token: 'mock-jwt-token'
      }
    };

    const emptyRootState = {
      auth: initialState
    };

    describe('selectCurrentUsername', () => {
      it('현재 구현된 사용자명 선택 로직을 테스트한다', () => {
        // When & Then: 인증된 상태에서 사용자명 선택
        expect(selectCurrentUsername(mockRootState)).toBe('testuser');
        
        // When & Then: 비인증 상태에서 사용자명 선택
        expect(selectCurrentUsername(emptyRootState)).toBeNull();
      });
    });

    describe('selectCurrentName', () => {
      it('현재 구현된 사용자 이름 선택 로직을 테스트한다', () => {
        // When & Then: 인증된 상태에서 사용자 이름 선택
        expect(selectCurrentName(mockRootState)).toBe('테스트 사용자');
        
        // When & Then: 비인증 상태에서 사용자 이름 선택
        expect(selectCurrentName(emptyRootState)).toBeNull();
      });
    });

    describe('selectCurrentToken', () => {
      it('현재 구현된 토큰 선택 로직을 테스트한다', () => {
        // When & Then: 인증된 상태에서 토큰 선택
        expect(selectCurrentToken(mockRootState)).toBe('mock-jwt-token');
        
        // When & Then: 비인증 상태에서 토큰 선택
        expect(selectCurrentToken(emptyRootState)).toBeNull();
      });
    });
  });

  describe('통합 시나리오 테스트', () => {
    it('로그인 후 로그아웃 플로우를 테스트한다', () => {
      // Given: 초기 상태
      let state = initialState;

      // When: 로그인 실행
      state = authReducer(state, setCredentials(mockAuthData));

      // Then: 로그인 상태 확인
      expect(state.username).toBe('testuser');
      expect(state.token).toBe('mock-jwt-token');

      // When: 로그아웃 실행
      state = authReducer(state, logOut());

      // Then: 로그아웃 상태 확인
      expect(state).toEqual(initialState);
    });

    it('여러 번 로그인 시도 시 최신 정보로 업데이트되어야 한다', () => {
      // Given: 초기 상태
      let state = initialState;

      // When: 첫 번째 로그인
      const firstLoginData = {
        data: {
          username: 'user1',
          name: '첫 번째 사용자',
          token: 'token1'
        }
      };
      state = authReducer(state, setCredentials(firstLoginData));

      // Then: 첫 번째 로그인 정보 확인
      expect(state.username).toBe('user1');

      // When: 두 번째 로그인 (다른 사용자)
      const secondLoginData = {
        data: {
          username: 'user2',
          name: '두 번째 사용자',
          token: 'token2'
        }
      };
      state = authReducer(state, setCredentials(secondLoginData));

      // Then: 최신 로그인 정보로 업데이트 확인
      expect(state.username).toBe('user2');
      expect(state.name).toBe('두 번째 사용자');
      expect(state.token).toBe('token2');
    });
  });
});