import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Fix for react-beautiful-dnd with React 18
// This patch ensures that the drag and drop functionality works properly
const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

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

const Subtitle = styled.h2`
  color: #343a40;
  margin-top: 25px;
  font-size: 1.4rem;
`;

const Description = styled.p`
  color: #6c757d;
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 1.05rem;
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
  gap: 15px;
  margin-bottom: 25px;
`;

const ServerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 18px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
  border: ${props => props.isDragging ? '2px solid #28a745' : '1px solid #e9ecef'};
  cursor: grab;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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
      case 'api': return '#ffffff';
      case 'db': return '#ffffff';
      case 'message-queue': return '#ffffff';
      case 'function': return '#ffffff';
      default: return '#ffffff';
    }
  }};
  color: white;
  border-radius: 50%;
  margin-right: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ServerInfo = styled.div`
  flex: 1;
`;

const ServerName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #212529;
`;

const ServerType = styled.div`
  color: #6c757d;
  font-size: 0.95rem;
  margin-top: 4px;
`;

// DragHandle removed as entire component is now draggable

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

function Step3({ formData, setFormData }) {
  const navigate = useNavigate();
  const [deploymentOrder, setDeploymentOrder] = useState([]);

  useIsomorphicLayoutEffect(() => {
    // Initialize deployment order from servers if not already set
    if (formData.servers && (!formData.deploymentOrder || formData.deploymentOrder.length !== formData.servers.length)) {
      setDeploymentOrder([...formData.servers]);

      // Update formData with initial deployment order
      setFormData(prev => ({
        ...prev,
        deploymentOrder: [...formData.servers]
      }));
    } else if (formData.deploymentOrder) {
      setDeploymentOrder(formData.deploymentOrder);
    }
  }, [formData.servers, formData.deploymentOrder, setFormData]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(deploymentOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDeploymentOrder(items);

    // Update formData
    setFormData(prev => ({
      ...prev,
      deploymentOrder: items
    }));
  };

  const handlePrevious = () => {
    navigate('/step2');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step4');
  };

  return (
    <Container>
      <Title>배포 계획 작성 - 3단계: 배포 순서 정의</Title>
      <Description>
        서버 배포 순서를 드래그 앤 드롭으로 조정하세요. 의존성을 고려하여 순서를 설정하는 것이 중요합니다.
        (예: 데이터베이스 서버가 API 서버보다 먼저 배포되어야 할 수 있습니다.)
      </Description>

      <Form onSubmit={handleSubmit}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="servers">
            {(provided) => (
              <ServerList
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {deploymentOrder.map((server, index) => (
                  <Draggable key={server.id} draggableId={`server-${server.id}`} index={index}>
                    {(provided, snapshot) => (
                      <ServerItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      >
                        <ServerIcon type={server.type}>{getServerIcon(server.type)}</ServerIcon>
                        <ServerInfo>
                          <ServerName>{server.name}</ServerName>
                          <ServerType>{getServerTypeName(server.type)}</ServerType>
                        </ServerInfo>
                      </ServerItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ServerList>
            )}
          </Droppable>
        </DragDropContext>

        <ButtonGroup>
          <Button type="button" secondary onClick={handlePrevious}>이전 단계</Button>
          <Button type="submit">다음 단계</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default Step3;
