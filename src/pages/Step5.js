import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePDF } from 'react-to-pdf';

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

const SummaryContainer = styled.div`
  margin-top: 30px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 30px;
  background-color: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

const SummarySection = styled.div`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #212529;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 12px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-weight: 600;
  width: 200px;
  color: #495057;
`;

const InfoValue = styled.div`
  flex: 1;
  color: #212529;
  font-size: 1.05rem;
`;

const ServerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const ServerItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const ServerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ServerIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: ${props => {
    switch(props.type) {
      case 'api': return '#ffffff';
      case 'db': return '#ffffff';
      case 'message-queue': return '#ffffff';
      case 'function': return '#ffffff';
      default: return '#ffffff';
    }
  }};
  color: white;
  border-radius: 50%;
  margin-right: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ServerName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #212529;
`;

const ServerType = styled.div`
  color: #6c757d;
  margin-left: 10px;
  font-size: 0.95rem;
`;

const DetailSection = styled.div`
  margin-top: 20px;
  border-top: 1px dashed #dee2e6;
  padding-top: 20px;
`;

const DetailTitle = styled.h3`
  color: #495057;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const EnvVarList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 15px;
`;

const EnvVarItem = styled.div`
  display: flex;
  align-items: center;
`;

const EnvVarKey = styled.div`
  font-weight: 600;
  margin-right: 10px;
  color: #495057;
`;

const SqlItem = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SqlDescription = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
`;

const SqlQuery = styled.pre`
  background-color: #f1f3f5;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
  border: 1px solid #e9ecef;
  line-height: 1.5;
`;

const RollbackInfo = styled.div`
  margin-top: 15px;
`;

const RollbackPoint = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  color: #495057;
`;

const RollbackProcedure = styled.pre`
  background-color: #f1f3f5;
  padding: 15px;
  border-radius: 6px;
  white-space: pre-wrap;
  font-size: 0.9rem;
  border: 1px solid #e9ecef;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: ${props => {
    if (props.primary) return '#28a745';
    if (props.secondary) return '#6c757d';
    return '#007bff';
  }};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => {
      if (props.primary) return '#218838';
      if (props.secondary) return '#5a6268';
      return '#0069d9';
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
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

// Server type names in Korean
const getServerTypeName = (type) => {
  switch(type) {
    case 'api': return 'Azure App Service';
    case 'db': return 'database';
    case 'message-queue': return 'Azure Service Bus';
    case 'function': return 'Azure Function';
    default: return 'etc';
  }
};

// Environment names in Korean
const getEnvironmentName = (env) => {
  switch(env) {
    case '개발': return '개발 환경';
    case '스테이징': return '스테이징 환경';
    case '프로덕션': return '프로덕션 환경';
    default: return env;
  }
};

function Step5({ formData }) {
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({
    filename: `${formData.projectName || '배포계획'}_배포계획서.pdf`,
    options: {
      encoding: 'utf-8',
      format: 'a4',
    }
  });

  const handlePrevious = () => {
    navigate('/step4');
  };

  const handleDownloadPDF = () => {
    toPDF();
  };

  return (
    <Container>
      <Title>배포 계획 작성 - 5단계: 결과 확인</Title>

      <SummaryContainer ref={targetRef}>
        <SummarySection>
          <SectionTitle>기본 정보</SectionTitle>
          <InfoRow>
            <InfoLabel>프로젝트명:</InfoLabel>
            <InfoValue>{formData.projectName}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>배포 환경:</InfoLabel>
            <InfoValue>{getEnvironmentName(formData.environment)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>예상 소요 시간:</InfoLabel>
            <InfoValue>{formData.estimatedTime} 분</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>서버 수:</InfoLabel>
            <InfoValue>{formData.serverCount} 대</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>배포 일정:</InfoLabel>
            <InfoValue>{formData.deploymentDate}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>담당자:</InfoLabel>
            <InfoValue>{formData.manager}</InfoValue>
          </InfoRow>
        </SummarySection>

        <SummarySection>
          <SectionTitle>배포 순서</SectionTitle>
          <ServerList>
            {formData.deploymentOrder?.map((server, index) => (
              <ServerItem key={server.id}>
                <ServerHeader>
                  <div style={{ marginRight: '10px' }}>{index + 1}.</div>
                  <ServerIcon type={server.type}>{getServerIcon(server.type)}</ServerIcon>
                  <ServerName>{server.name}</ServerName>
                  <ServerType>({getServerTypeName(server.type)})</ServerType>
                </ServerHeader>

                <div style={{ marginTop: '15px', marginLeft: '15px' }}>
                  {/* Look up server details from formData.servers using server.id */}
                  {(() => {
                    // Find the server in formData.servers that matches the current server id
                    const serverWithDetails = formData.servers.find(s => s.id === server.id);
                    const details = serverWithDetails?.details || server.details;

                    return details && (
                      <>
                        {details.env && details.env.length > 0 && (
                          <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>- 환경변수</div>
                            <div style={{ marginLeft: '20px' }}>
                              {details.env.map((envVar, i) => (
                                <div key={i} style={{ marginBottom: '5px' }}>
                                  - {envVar.key}: {envVar.value}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {details.sql && details.sql.length > 0 && (
                          <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>- SQL</div>
                            <div style={{ marginLeft: '20px' }}>
                              {details.sql.map((sql, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                  - {sql.description}
                                  <SqlQuery>{sql.query}</SqlQuery>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {details.rollback && (details.rollback.point || details.rollback.procedure) && (
                          <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>- 롤백전략</div>
                            <div style={{ marginLeft: '20px' }}>
                              {details.rollback.point && (
                                <div style={{ marginBottom: '5px' }}>
                                  - 롤백 시점: {details.rollback.point}
                                </div>
                              )}
                              {details.rollback.procedure && (
                                <div>
                                  - 복구 절차:
                                  <RollbackProcedure>{details.rollback.procedure}</RollbackProcedure>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </ServerItem>
            ))}
          </ServerList>
        </SummarySection>
      </SummaryContainer>

      <ButtonGroup>
        <Button type="button" secondary onClick={handlePrevious}>이전 단계</Button>
        <Button type="button" primary onClick={handleDownloadPDF}>PDF 다운로드</Button>
      </ButtonGroup>
    </Container>
  );
}

export default Step5;
