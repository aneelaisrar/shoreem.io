import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Printer, X, Check, Sparkles } from 'lucide-react';
import { ExportFormat } from '../../types';
import { exportContent } from '../../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  type?: string;
  platform?: string;
  onSuccess: (format: ExportFormat) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  type,
  platform,
  onSuccess,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('txt');

  if (!isOpen) return null;

  const handleDownload = () => {
    exportContent(title, content, selectedFormat, {
      type,
      platform,
    });
    onSuccess(selectedFormat);
    onClose();
  };

  const formats: { id: ExportFormat; title: string; desc: string; icon: React.ReactNode; badge: string }[] = [
    {
      id: 'txt',
      title: 'Plain Text (.txt)',
      desc: 'Clean unformatted file for quick notes, text editors, and immediate copy-paste.',
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
      badge: 'Fast & Simple',
    },
    {
      id: 'csv',
      title: 'Spreadsheet (.csv)',
      desc: 'Comma-separated format ready for Google Sheets, Excel, Notion, and Airtable.',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      badge: 'Structured Data',
    },
    {
      id: 'pdf',
      title: 'Document PDF (.pdf)',
      desc: 'Sleek branded document layout with print formatting, timestamps, and typography.',
      icon: <Printer className="w-5 h-5 text-rose-400" />,
      badge: 'Print / Save PDF',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold">Export Content Asset</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xs text-slate-400 font-medium mb-1">Asset:</div>
          <div className="text-sm font-bold text-white line-clamp-1">{title}</div>
        </div>

        {/* Format Selectors */}
        <div className="space-y-2.5 mb-6">
          {formats.map((fmt) => (
            <div
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                selectedFormat === fmt.id
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                {fmt.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{fmt.title}</span>
                  <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {fmt.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{fmt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .{selectedFormat.toUpperCase()}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
