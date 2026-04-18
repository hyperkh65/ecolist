-- Tables for (주)와이앤케이 LED Platform CMS

-- 1. Site Settings (Company info, Menu names, Hero settings)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- 'company', 'menu', 'hero', 'footer'
    config JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    manufacturer TEXT DEFAULT 'YNK',
    price BIGINT NOT NULL,
    original_price BIGINT,
    description TEXT,
    image TEXT,
    specs JSONB DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    documents JSONB DEFAULT '[]'::jsonb,
    certificates TEXT[] DEFAULT '{}',
    badge TEXT,
    stock INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 4.5,
    reviews INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Board/Blog Posts
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL, -- 'board', 'blog'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'YNK Admin',
    attachments JSONB DEFAULT '[]', -- List of {name, url}
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Finance Intelligence
CREATE TABLE IF NOT EXISTS finance_weekly_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    week_label TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    highlight TEXT,
    bullets JSONB DEFAULT '[]'::jsonb,
    market_snapshot JSONB DEFAULT '{}'::jsonb,
    slug TEXT UNIQUE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS finance_news_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source TEXT NOT NULL,
    category TEXT DEFAULT 'macro',
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    url TEXT UNIQUE,
    image_url TEXT,
    relevance_score DECIMAL(6,2) DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS finance_podcast_episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host TEXT DEFAULT 'Ecolist Desk',
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    script_summary TEXT,
    audio_url TEXT,
    cover_url TEXT,
    duration TEXT DEFAULT '00:00',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS finance_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_type TEXT NOT NULL, -- weekly_report | news_sync | podcast_sync
    active BOOLEAN DEFAULT TRUE,
    schedule TEXT DEFAULT 'weekly',
    last_run_at TIMESTAMP WITH TIME ZONE,
    next_run_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS finance_market_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE UNIQUE NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Data
INSERT INTO site_settings (category, config) VALUES 
('company', '{"name": "(주)와이앤케이", "address": "인천광역시 남동구 산단로 35 (남촌동)", "tel": "032-862-1350", "fax": "032-863-1351", "email": "contact@ynk2014.com", "business_id": "131-86-67779", "about_text": "와이앤케이는 미래를 밝히는 LED 솔루션 전문 기업입니다."}'),
('menu', '[{"label": "회사소개", "href": "/about"}, {"label": "제품소개", "href": "/shop"}, {"label": "무역/인증 안내", "href": "/trade-info"}, {"label": "물류조회", "href": "/tracking"}, {"label": "게시판", "href": "/board"}, {"label": "블로그", "href": "/blog"}]');
