import React, { useEffect, useState } from 'react';
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

const ServerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ServerItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const ServerIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  background-color: ${props => {
    switch(props.type) {
      case 'web': return '#28a745';
      case 'db': return '#007bff';
      case 'api': return '#fd7e14';
      case 'cache': return '#6f42c1';
      default: return '#6c757d';
    }
  }};
  color: white;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #495057;
  font-size: 0.95rem;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: ${props => props.secondary ? '#6c757d' : '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${props => props.secondary ? '#5a6268' : '#0069d9'};
  }

  &:active {
    transform: translateY(1px);
  }
`;

// Server type icons
const getServerIcon = (type) => {
  switch(type) {
    case 'web': return '🌐';
    case 'db': return '💾';
    case 'api': return '🔌';
    case 'cache': return '⚡';
    default: return '🖥️';
  }
};

function Step2({ formData, setFormData }) {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);

  useEffect(() => {
    // Initialize servers based on serverCount from Step 1
    if (formData.serverCount && (!formData.servers || formData.servers.length !== parseInt(formData.serverCount))) {
      const count = parseInt(formData.serverCount);
      const initialServers = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: `서버 ${index + 1}`,
        type: 'web'
      }));
      setServers(initialServers);

      // Update formData with initial servers
      setFormData(prev => ({
        ...prev,
        servers: initialServers
      }));
    } else if (formData.servers) {
      setServers(formData.servers);
    }
  }, [formData.serverCount, formData.servers, setFormData]);

  const handleServerChange = (id, field, value) => {
    const updatedServers = servers.map(server =>
      server.id === id ? { ...server, [field]: value } : server
    );
    setServers(updatedServers);

    // Update formData
    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handlePrevious = () => {
    navigate('/step1');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step3');
  };

  return (
    <Container>
      <Title>배포 계획 작성 - 2단계: 서버 설정</Title>
      <Form onSubmit={handleSubmit}>
        <ServerList>
          {servers.map(server => (
            <ServerItem key={server.id}>
              <ServerIcon type={server.type}>{getServerIcon(server.type)}</ServerIcon>
              <InputGroup>
                <Label htmlFor={`serverName-${server.id}`}>서버 이름</Label>
                <Input
                  type="text"
                  id={`serverName-${server.id}`}
                  value={server.name}
                  onChange={(e) => handleServerChange(server.id, 'name', e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor={`serverType-${server.id}`}>서버 타입</Label>
                <Select
                  id={`serverType-${server.id}`}
                  value={server.type}
                  onChange={(e) => handleServerChange(server.id, 'type', e.target.value)}
                >
                  <option value="web">웹 서버</option>
                  <option value="db">데이터베이스</option>
                  <option value="api">API 서버</option>
                  <option value="cache">캐시 서버</option>
                  <option value="other">기타</option>
                </Select>
              </InputGroup>
            </ServerItem>
          ))}
        </ServerList>

        <ButtonGroup>
          <Button type="button" secondary onClick={handlePrevious}>이전 단계</Button>
          <Button type="submit">다음 단계</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default Step2;
