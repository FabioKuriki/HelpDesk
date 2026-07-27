INSERT INTO usuario (id, name,email, password, profile, active, createdAt)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Fabio', 'fabio@email.com',
     '123', 'ATENDENTE', true,CURRENT_DATE);

INSERT INTO usuario (id, name,email, password, profile, active, createdAt)
VALUES ('550e8400-e29b-41d4-a716-446655440001', 'Rafael', 'rafael@email.com',
        '123', 'SOLICITANTE', true,CURRENT_DATE);

INSERT INTO ticket (
    id, title, description, category,
    requester_id, responsible_id,
    status, priority,
    createdAt, updatedAt, closedAt
) VALUES

-- Dia 1 (5 dias atrás)
('a1111111-1111-1111-1111-111111111111',
 'Erro ao fazer upload',
 'Sistema falha ao enviar arquivos',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'RESOLVIDO',
 'ALTA',
 NOW() - INTERVAL '5 days',
 NOW() - INTERVAL '4 days 18 hours',
 NOW() - INTERVAL '4 days 20 hours'),

-- Dia 2
('b2222222-2222-2222-2222-222222222222',
 'Criar novo usuário',
 'Solicitação de criação de conta para novo colaborador',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'EM_ANDAMENTO',
 'MEDIA',
 NOW() - INTERVAL '4 days',
 NOW() - INTERVAL '1 day 6 hours',
 NULL),

-- Dia 2
('c3333333-3333-3333-3333-333333333333',
 'Sistema lento',
 'Relatos de lentidão no dashboard',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'ABERTO',
 'URGENTE',
 NOW() - INTERVAL '4 days',
 NOW() - INTERVAL '8 hours',
 NULL),

-- Dia 3
('d4444444-4444-4444-4444-444444444444',
 'Reset de senha',
 'Usuário esqueceu senha e precisa resetar',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'RESOLVIDO',
 'BAIXA',
 NOW() - INTERVAL '3 days',
 NOW() - INTERVAL '2 days 4 hours',
 NOW() - INTERVAL '2 days 5 hours'),

-- Dia 3
('e5555555-5555-5555-5555-555555555555',
 'Erro 500 no sistema',
 'Erro interno ao acessar relatório',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'EM_ANDAMENTO',
 'ALTA',
 NOW() - INTERVAL '3 days',
 NOW() - INTERVAL '6 hours',
 NULL),

-- Dia 4
('f6666666-6666-6666-6666-666666666666',
 'Solicitar acesso admin',
 'Usuário precisa de permissão administrativa',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'ABERTO',
 'MEDIA',
 NOW() - INTERVAL '2 days',
 NOW() - INTERVAL '3 hours',
 NULL),

-- Dia 4
('11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
 'Falha no login SSO',
 'Integração com login único falhando',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'RESOLVIDO',
 'URGENTE',
 NOW() - INTERVAL '2 days',
 NOW() - INTERVAL '10 hours',
 NOW() - INTERVAL '9 hours'),

-- Dia 5 (ontem)
('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 'Atualização de sistema',
 'Solicitação de atualização de versão',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'ABERTO',
 'BAIXA',
 NOW() - INTERVAL '1 days',
 NOW() - INTERVAL '2 hours',
 NULL),

-- Hoje
('33333333-cccc-cccc-cccc-cccccccccccc',
 'Dashboard não carrega',
 'Tela principal não exibe dados',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'EM_ANDAMENTO',
 'URGENTE',
 NOW() - INTERVAL '6 hours',
 NOW() - INTERVAL '15 minutes',
 NULL);

-- Tickets sem responsável

INSERT INTO ticket (
    id, title, description, category,
    requester_id, responsible_id,
    status, priority,
    createdAt, updatedAt, closedAt
) VALUES


('44444444-dddd-dddd-dddd-dddddddddddd',
 'Erro ao gerar relatório',
 'Relatório mensal apresenta falha ao ser exportado',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 NULL,
 'ABERTO',
 'ALTA',
 NOW() - INTERVAL '6 hours',
 NOW() - INTERVAL '6 hours',
 NULL),


('55555555-eeee-eeee-eeee-eeeeeeeeeeee',
 'Solicitação de novo equipamento',
 'Colaborador solicita notebook para novo projeto',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 NULL,
 'ABERTO',
 'MEDIA',
 NOW() - INTERVAL '12 hours',
 NOW() - INTERVAL '12 hours',
 NULL),


('66666666-ffff-ffff-ffff-ffffffffffff',
 'Aplicação fora do ar',
 'Usuários não conseguem acessar o sistema principal',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 NULL,
 'EM_ANDAMENTO',
 'URGENTE',
 NOW() - INTERVAL '1 day',
 NOW() - INTERVAL '8 hours',
 NULL),


('77777777-aaaa-bbbb-cccc-dddddddddddd',
 'Alterar permissão de usuário',
 'Usuário precisa de acesso ao módulo financeiro',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 NULL,
 'ABERTO',
 'BAIXA',
 NOW() - INTERVAL '2 days',
 NOW() - INTERVAL '2 days',
 NULL),


('88888888-bbbb-cccc-dddd-eeeeeeeeeeee',
 'Erro na sincronização',
 'Dados não estão sincronizando com o sistema externo',
 'INCIDENTE',
 '550e8400-e29b-41d4-a716-446655440001',
 NULL,
 'RESOLVIDO',
 'MEDIA',
 NOW() - INTERVAL '3 days',
 NOW() - INTERVAL '1 day',
 NOW() - INTERVAL '1 day'),


('99999999-cccc-dddd-eeee-ffffffffffff',
 'Criar grupo de acesso',
 'Solicitação para criação de grupo de usuários',
 'SOLICITACAO',
 '550e8400-e29b-41d4-a716-446655440001',
 NULL,
 'EM_ANDAMENTO',
 'MEDIA',
 NOW() - INTERVAL '4 days',
 NOW() - INTERVAL '3 days',
 NULL);