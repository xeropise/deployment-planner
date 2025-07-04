import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  text-align: center;
  color: #212529;
  margin-bottom: 30px;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #495057;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  align-self: flex-end;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #0069d9;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RangeValue = styled.div`
  text-align: center;
  font-weight: 600;
  color: #007bff;
  font-size: 1.1rem;
`;

function Step1({ formData, setFormData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step2');
  };

  return (
    <Container>
      <Title>배포 계획 작성 - 1단계: 기본 정보 입력</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="projectName">프로젝트명</Label>
          <Input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="environment">배포 환경</Label>
          <Select
            id="environment"
            name="environment"
            value={formData.environment || '개발'}
            onChange={handleChange}
            required
          >
            <option value="개발">개발</option>
            <option value="스테이징">스테이징</option>
            <option value="프로덕션">프로덕션</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="estimatedTime">예상 소요 시간 (분)</Label>
          <Input
            type="number"
            id="estimatedTime"
            name="estimatedTime"
            min="1"
            value={formData.estimatedTime || '30'}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="serverCount">서버 수</Label>
          <RangeContainer>
            <Input
              type="range"
              id="serverCount"
              name="serverCount"
              min="1"
              max="10"
              value={formData.serverCount || '3'}
              onChange={handleChange}
              required
            />
            <RangeValue>{formData.serverCount || '3'} 대</RangeValue>
          </RangeContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="deploymentDate">배포 일정</Label>
          <Input
            type="date"
            id="deploymentDate"
            name="deploymentDate"
            value={formData.deploymentDate || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="manager">담당자</Label>
          <Input
            type="text"
            id="manager"
            name="manager"
            placeholder="담당자 이름을 입력하세요"
            value={formData.manager || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit">다음 단계</Button>
      </Form>
    </Container>
  );
}

export default Step1;
