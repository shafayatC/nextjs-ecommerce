'use client';

import { useState } from 'react';
import { Image as ImageIcon, Video, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { MediaItem } from '@/lib/mock-data';

interface MediaGridProps {
  items: MediaItem[];
  filterType: string;
  searchQuery: string;
  onPreview: (item: MediaItem) => void;
}

export function MediaGrid({ items, filterType, searchQuery, onPreview }: MediaGridProps) {
  const filteredItems = items.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {filteredItems.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
          onClick={() => onPreview(item)}
        >
          <div className="h-32 bg-muted flex items-center justify-center relative">
            {item.type === 'image' ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-primary/60" />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-purple-500/40 flex items-center justify-center">
                <Video className="h-12 w-12 text-purple-500/60" />
              </div>
            )}
            <Badge
              variant={item.type === 'image' ? 'default' : 'secondary'}
              className="absolute top-2 right-2"
            >
              {item.type}
            </Badge>
          </div>
          <CardContent className="p-3">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.size}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MediaItem | null;
}

export function MediaPreviewModal({ isOpen, onClose, item }: MediaPreviewModalProps) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name}>
      <div className="space-y-4">
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          {item.type === 'image' ? (
            <ImageIcon className="h-24 w-24 text-muted-foreground" />
          ) : (
            <Video className="h-24 w-24 text-muted-foreground" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium capitalize">{item.type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Size:</span>
            <span className="font-medium">{item.size}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Uploaded:</span>
            <span className="font-medium">{item.createdAt}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
