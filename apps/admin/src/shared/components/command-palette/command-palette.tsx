import { useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard,
  ListMusic,
  Music,
  Plus,
  Search,
  Tent,
  Ticket,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@shared/constants/path';

import * as styles from './command-palette.css';

interface Command {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  group: string;
}

const COMMANDS: Command[] = [
  {
    id: 'dashboard',
    label: '대시보드',
    path: PATH.DASHBOARD,
    icon: <LayoutDashboard size={16} />,
    group: '페이지',
  },
  {
    id: 'pending',
    label: '대기 목록',
    path: PATH.PENDING,
    icon: <ListMusic size={16} />,
    group: '페이지',
  },
  {
    id: 'festival',
    label: '페스티벌',
    path: PATH.FESTIVAL,
    icon: <Tent size={16} />,
    group: '페이지',
  },
  {
    id: 'concert',
    label: '콘서트',
    path: PATH.CONCERT,
    icon: <Music size={16} />,
    group: '페이지',
  },
  {
    id: 'ticketing',
    label: '예매처 관리',
    path: PATH.TICKETING_PLATFORM,
    icon: <Ticket size={16} />,
    group: '페이지',
  },
  {
    id: 'new-performance',
    label: '새 공연 등록',
    path: PATH.PERFORMANCE_EDITOR.replace(':id', 'new'),
    icon: <Plus size={16} />,
    group: '작업',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()),
      )
    : COMMANDS;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (command: Command) => {
    navigate(command.path);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.palette}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.searchRow}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="명령어 검색..."
          />
          <kbd className={styles.escKey}>ESC</kbd>
        </div>
        <div className={styles.results}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>결과 없음</div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                className={
                  i === selectedIndex
                    ? styles.resultItemActive
                    : styles.resultItem
                }
                onClick={() => handleSelect(cmd)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span className={styles.resultIcon}>{cmd.icon}</span>
                <span className={styles.resultLabel}>{cmd.label}</span>
                <span className={styles.resultGroup}>{cmd.group}</span>
              </button>
            ))
          )}
        </div>
        <div className={styles.footer}>
          <span className={styles.footerHint}>
            <kbd className={styles.kbd}>↑↓</kbd> 이동
          </span>
          <span className={styles.footerHint}>
            <kbd className={styles.kbd}>↵</kbd> 선택
          </span>
          <span className={styles.footerHint}>
            <kbd className={styles.kbd}>ESC</kbd> 닫기
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
