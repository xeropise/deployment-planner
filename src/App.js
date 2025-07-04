import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import Step5 from './pages/Step5';

const AppContainer = styled.div`
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const AppTitle = styled.h1`
  color: #212529;
  margin: 0;
  font-size: 2.2rem;
  font-weight: 600;
`;

const AppSubtitle = styled.p`
  color: #6c757d;
  margin: 10px 0 0;
  font-size: 1.1rem;
`;

const ProgressContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 30px;
  padding: 0 20px;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #e9ecef;
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const ProgressStep = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#007bff' : props.completed ? '#28a745' : '#e9ecef'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'none'};
  }
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6c757d;
`;

const ProgressLabel = styled.div`
  text-align: center;
  width: 80px;
  margin-left: -25px;
  margin-right: -25px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#007bff' : '#6c757d'};
`;

function App() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    projectName: '',
    environment: '개발',
    estimatedTime: '30',
    serverCount: '3',
    servers: [],
    deploymentOrder: []
  });

  const getStepNumber = (path) => {
    if (!path) return 1;
    const match = path.match(/\/step(\d)/);
    return match ? parseInt(match[1]) : 1;
  };

  const currentStep = getStepNumber(location.pathname);

  return (
    <AppContainer>
      <Header>
        <AppTitle>배포 계획 작성 도구</AppTitle>
        <AppSubtitle>단계별로 배포 계획을 작성하고 PDF로 다운로드하세요</AppSubtitle>
      </Header>

      <ProgressContainer>
        <ProgressBar>
          {[1, 2, 3, 4, 5].map(step => (
            <ProgressStep
              key={step}
              active={step === currentStep}
              completed={step < currentStep}
            >
              {step}
            </ProgressStep>
          ))}
        </ProgressBar>
        <ProgressLabels>
          <ProgressLabel active={currentStep === 1}>기본 정보</ProgressLabel>
          <ProgressLabel active={currentStep === 2}>서버 설정</ProgressLabel>
          <ProgressLabel active={currentStep === 3}>배포 순서</ProgressLabel>
          <ProgressLabel active={currentStep === 4}>상세 설정</ProgressLabel>
          <ProgressLabel active={currentStep === 5}>결과 확인</ProgressLabel>
        </ProgressLabels>
      </ProgressContainer>

      <Routes>
        <Route path="/" element={<Navigate to="/step1" replace />} />
        <Route path="/step1" element={<Step1 formData={formData} setFormData={setFormData} />} />
        <Route path="/step2" element={<Step2 formData={formData} setFormData={setFormData} />} />
        <Route path="/step3" element={<Step3 formData={formData} setFormData={setFormData} />} />
        <Route path="/step4" element={<Step4 formData={formData} setFormData={setFormData} />} />
        <Route path="/step5" element={<Step5 formData={formData} />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
