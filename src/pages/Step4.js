import React, { useState, useEffect } from 'react';
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
  margin-bottom: 20px;
  font-size: 1.8rem;
`;

const Description = styled.p`
  color: #6c757d;
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 1.05rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
`;

const ServerSelector = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 25px;
  justify-content: center;
`;

const ServerButton = styled.button`
  padding: 12px 18px;
  background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#495057'};
  border: 1px solid ${props => props.active ? '#007bff' : '#ced4da'};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: ${props => props.active ? '600' : 'normal'};
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 2px 5px rgba(0, 123, 255, 0.2)' : 'none'};

  &:hover {
    background-color: ${props => props.active ? '#0069d9' : '#e9ecef'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

const ServerIcon = styled.span`
  font-size: 18px;
`;

const SettingsContainer = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 25px;
  background-color: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 25px;
`;

const Tab = styled.button`
  padding: 12px 20px;
  background-color: ${props => props.active ? '#fff' : '#f8f9fa'};
  border: 1px solid #dee2e6;
  border-bottom: ${props => props.active ? '2px solid #007bff' : '1px solid #dee2e6'};
  border-radius: 6px 6px 0 0;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  top: 1px;
  font-weight: ${props => props.active ? '600' : 'normal'};
  color: ${props => props.active ? '#007bff' : '#495057'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#fff' : '#e9ecef'};
    color: ${props => props.active ? '#007bff' : '#212529'};
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const VariableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const VariableItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  flex: 1;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 100%;
  min-height: 120px;
  font-family: monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const ActionButton = styled.button`
  padding: 8px;
  background-color: ${props => props.remove ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.remove ? '#c82333' : '#218838'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
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
    case 'api': return '🌐';
    case 'db': return '💾';
    case 'message-queue': return '🚎';
    case 'function': return '⚡';
    default: return '❓';
  }
};

function Step4({ formData, setFormData }) {
  const navigate = useNavigate();
  const [selectedServerId, setSelectedServerId] = useState(null);
  const [activeTab, setActiveTab] = useState('env');

  // Initialize server details if not already set
  useEffect(() => {
    if (formData.servers && formData.servers.length > 0) {
      // Set the first server as selected by default if none is selected
      if (selectedServerId === null) {
        setSelectedServerId(formData.servers[0].id);
      }

      // Initialize server details if not already set
      const updatedServers = formData.servers.map(server => {
        if (!server.details) {
          return {
            ...server,
            details: {
              env: [],
              sql: [],
              rollback: { point: '', procedure: '' }
            }
          };
        }
        return server;
      });

      if (JSON.stringify(updatedServers) !== JSON.stringify(formData.servers)) {
        setFormData(prev => ({
          ...prev,
          servers: updatedServers
        }));
      }
    }
  }, [formData.servers, selectedServerId, setFormData]);

  const selectedServer = formData.servers?.find(server => server.id === selectedServerId);

  const handleServerSelect = (serverId) => {
    setSelectedServerId(serverId);
  };

  const handleAddEnvVar = () => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        return {
          ...server,
          details: {
            ...server.details,
            env: [...server.details.env, { key: '', value: '' }]
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handleRemoveEnvVar = (index) => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        const updatedEnv = [...server.details.env];
        updatedEnv.splice(index, 1);
        return {
          ...server,
          details: {
            ...server.details,
            env: updatedEnv
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handleEnvVarChange = (index, field, value) => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        const updatedEnv = [...server.details.env];
        updatedEnv[index] = { ...updatedEnv[index], [field]: value };
        return {
          ...server,
          details: {
            ...server.details,
            env: updatedEnv
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handleAddSql = () => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        return {
          ...server,
          details: {
            ...server.details,
            sql: [...server.details.sql, { query: '', description: '' }]
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handleRemoveSql = (index) => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        const updatedSql = [...server.details.sql];
        updatedSql.splice(index, 1);
        return {
          ...server,
          details: {
            ...server.details,
            sql: updatedSql
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handleSqlChange = (index, field, value) => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        const updatedSql = [...server.details.sql];
        updatedSql[index] = { ...updatedSql[index], [field]: value };
        return {
          ...server,
          details: {
            ...server.details,
            sql: updatedSql
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handleRollbackChange = (field, value) => {
    const updatedServers = formData.servers.map(server => {
      if (server.id === selectedServerId) {
        return {
          ...server,
          details: {
            ...server.details,
            rollback: {
              ...server.details.rollback,
              [field]: value
            }
          }
        };
      }
      return server;
    });

    setFormData(prev => ({
      ...prev,
      servers: updatedServers
    }));
  };

  const handlePrevious = () => {
    navigate('/step3');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step5');
  };

  if (!selectedServer) {
    return <div>로딩 중...</div>;
  }

  // Helper function to get environment name in Korean
  const getEnvironmentName = (env) => {
    switch(env) {
      case '개발': return '개발 환경';
      case '스테이징': return '스테이징 환경';
      case '프로덕션': return '프로덕션 환경';
      default: return env;
    }
  };

  // Helper function to get server type name in Korean
  const getServerTypeName = (type) => {
    switch(type) {
      case 'api': return 'Azure App Service';
      case 'db': return 'database';
      case 'message-queue': return 'Azure Service Bus';
      case 'function': return 'Azure Function';
      default: return 'etc';
    }
  };

  return (
    <Container>
      <Title>배포 계획 작성 - 4단계: 요약</Title>
      <Description>
        배포 계획의 모든 정보를 확인하세요.
      </Description>

      {/* Summary of information from Steps 1-3 */}
      <SummaryContainer>
        <SummaryTitle>이전 단계 정보 요약</SummaryTitle>
        <SummaryContent>
          <SummaryItem>
            <SummaryLabel>프로젝트명:</SummaryLabel>
            <SummaryValue>{formData.projectName}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>배포 환경:</SummaryLabel>
            <SummaryValue>{getEnvironmentName(formData.environment)}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>예상 소요 시간:</SummaryLabel>
            <SummaryValue>{formData.estimatedTime} 분</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>자원 수:</SummaryLabel>
            <SummaryValue>{formData.servers?.length || 0}</SummaryValue>
          </SummaryItem>
        </SummaryContent>
      </SummaryContainer>

      <Form onSubmit={handleSubmit}>
        <ServerSelector>
          {formData.deploymentOrder?.map(server => (
            <ServerButton
              key={server.id}
              type="button"
              active={selectedServerId === server.id}
              onClick={() => handleServerSelect(server.id)}
            >
              <ServerIcon>{getServerIcon(server.type)}</ServerIcon>
              {server.name}
            </ServerButton>
          ))}
        </ServerSelector>

        <SettingsContainer>
          <TabContainer>
            <Tab
              type="button"
              active={activeTab === 'env'}
              onClick={() => setActiveTab('env')}
            >
              환경변수
            </Tab>
            <Tab
              type="button"
              active={activeTab === 'sql'}
              onClick={() => setActiveTab('sql')}
            >
              SQL 스크립트
            </Tab>
            <Tab
              type="button"
              active={activeTab === 'rollback'}
              onClick={() => setActiveTab('rollback')}
            >
              롤백 시점
            </Tab>
          </TabContainer>

          <TabContent active={activeTab === 'env'}>
            <VariableList>
              {selectedServer.details.env.map((envVar, index) => (
                <VariableItem key={index}>
                  <Input
                    type="text"
                    placeholder="환경변수명"
                    value={envVar.key}
                    onChange={(e) => handleEnvVarChange(index, 'key', e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="값"
                    value={envVar.value}
                    onChange={(e) => handleEnvVarChange(index, 'value', e.target.value)}
                  />
                  <ActionButton
                    type="button"
                    remove
                    onClick={() => handleRemoveEnvVar(index)}
                  >
                    -
                  </ActionButton>
                </VariableItem>
              ))}
              <ActionButton
                type="button"
                onClick={handleAddEnvVar}
                style={{ alignSelf: 'flex-start' }}
              >
                +
              </ActionButton>
            </VariableList>
          </TabContent>

          <TabContent active={activeTab === 'sql'}>
            <VariableList>
              {selectedServer.details.sql.map((sql, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <VariableItem>
                    <Input
                      type="text"
                      placeholder="SQL 설명"
                      value={sql.description}
                      onChange={(e) => handleSqlChange(index, 'description', e.target.value)}
                      style={{ marginBottom: '10px' }}
                    />
                    <ActionButton
                      type="button"
                      remove
                      onClick={() => handleRemoveSql(index)}
                    >
                      -
                    </ActionButton>
                  </VariableItem>
                  <TextArea
                    placeholder="SQL 쿼리"
                    value={sql.query}
                    onChange={(e) => handleSqlChange(index, 'query', e.target.value)}
                  />
                </div>
              ))}
              <ActionButton
                type="button"
                onClick={handleAddSql}
                style={{ alignSelf: 'flex-start' }}
              >
                +
              </ActionButton>
            </VariableList>
          </TabContent>

          <TabContent active={activeTab === 'rollback'}>
            <VariableList>
              <div>
                <Label>롤백 시점</Label>
                <Input
                  type="text"
                  placeholder="롤백 시점 정의"
                  value={selectedServer.details.rollback.point}
                  onChange={(e) => handleRollbackChange('point', e.target.value)}
                  style={{ marginBottom: '20px', width: '100%' }}
                />
              </div>
              <div>
                <Label>복구 절차</Label>
                <TextArea
                  placeholder="복구 절차 명시"
                  value={selectedServer.details.rollback.procedure}
                  onChange={(e) => handleRollbackChange('procedure', e.target.value)}
                />
              </div>
            </VariableList>
          </TabContent>
        </SettingsContainer>

        <ButtonGroup>
          <Button type="button" secondary onClick={handlePrevious}>이전 단계</Button>
          <Button type="submit">다음 단계</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const SummaryContainer = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  background-color: #f8f9fa;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

const SummaryTitle = styled.h3`
  color: #212529;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
`;

const SummaryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
`;

const SummaryLabel = styled.div`
  font-weight: 600;
  width: 120px;
  color: #495057;
`;

const SummaryValue = styled.div`
  color: #212529;
`;

export default Step4;
