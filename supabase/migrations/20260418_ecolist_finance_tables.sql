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
    job_type TEXT NOT NULL,
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
