// src/Chat.styles.tsx
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 1000;
`;

export const Input = styled.textarea`
  flex: 1;
  border: none;
  padding: 0.5rem;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #2196f3;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const messageStyle = `
  max-width: 80%;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  word-break: break-word;
  line-height: 1.5;
  text-align: left;
  white-space: pre-wrap; // 追加
`;

export const MessageWrapper = styled.div<{ isUser: boolean }>`
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

export const UserMessage = styled.div`
  ${messageStyle};
  background-color: #2196f3;
  color: white;
`;

export const AIMessage = styled.div`
  ${messageStyle};
  background-color: #f1f1f1;
  color: #222;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 0.5rem;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-top-color: #2196f3;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;