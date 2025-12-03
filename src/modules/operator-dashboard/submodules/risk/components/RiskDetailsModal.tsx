import { useRef, useState } from "react";
import Modal from "../../../components/ui/Modal";
import Button from "@/modules/operator-dashboard/components/ui/Button";
import type { RiskApplication } from "../pages/RiskDashboard";
import { ShieldCheck } from "lucide-react";

interface Props {
  application: RiskApplication;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onManualReview: (id: string) => void;
  onRequestDocs: (id: string, docs: string[], custom?: string) => void;
  onSendToAML: (id: string) => void;
  onAddNote?: (id: string, text: string) => void;
}

export default function RiskDetailsModal({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onManualReview,
  onRequestDocs,
  onSendToAML,
}: Props) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [customDoc, setCustomDoc] = useState<string>("");

  const requestDocsRef = useRef<HTMLDivElement | null>(null);

  function handleScrollToDocs() {
    requestDocsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function toggleDoc(doc: string) {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  }

  const availableDocs = ["CI", "Venituri", "Contract muncă", "Altele"];

  const standardDocs = ["CI", "Venituri", "Contract"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Aplicație: ${application.id}`}
      width="max-w-4xl"
      titleClassName="text-blue-600"
      icon={<ShieldCheck className="w-6 h-6" />}
    >
      {/* Container cu scroll */}
      <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto pr-2 pb-4">
        {/* CLIENT INFO */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Client Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Nume:</strong> {application.client}
            </p>
            <p>
              <strong>Status:</strong> {application.status.replace("_", " ")}
            </p>
            <p>
              <strong>Email:</strong> client@exemplu.com
            </p>
            <p>
              <strong>Telefon:</strong> 0722 123 456
            </p>
            <p className="sm:col-span-2">
              <strong>Adresă:</strong> Str. Exemplu, nr.1, Timișoara
            </p>
          </div>
        </section>

        {/* Financial Info */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Date financiare
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Scor:</strong> {application.score}
            </p>
            <p>
              <strong>Venit:</strong> 5000 RON
            </p>
            <p>
              <strong>Cheltuieli:</strong> 3000 RON
            </p>
            <p>
              <strong>Suma cerută:</strong> 5000 RON
            </p>
          </div>
        </section>

        {/* Reason Codes */}
        {application.reasonCodes?.length > 0 && (
          <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
              Reason Codes
            </h3>
            <ul className="space-y-1 text-gray-500 dark:text-gray-400 text-sm">
              {application.reasonCodes.map((code) => (
                <li key={code}>
                  <strong className="text-gray-700 dark:text-gray-300">
                    {code}
                  </strong>{" "}
                  – {code} description
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* DOCUMENTS REQUEST */}
        <section
          ref={requestDocsRef}
          className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Solicitare Documente
          </h3>
          <div className="flex flex-col gap-2">
            {availableDocs.map((doc) => (
              <label
                key={doc}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={selectedDocs.includes(doc)}
                  onChange={() => toggleDoc(doc)}
                  className="accent-blue-600"
                />
                {doc}
              </label>
            ))}
            <input
              type="text"
              placeholder="Alt document..."
              value={customDoc}
              onChange={(e) => setCustomDoc(e.target.value)}
              className="mt-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <Button
              onClick={() => {
                onRequestDocs(application.id, selectedDocs, customDoc);
                setSelectedDocs([]);
                setCustomDoc("");
              }}
              className="mt-2"
            >
              Trimite solicitare
            </Button>
          </div>
        </section>
      </div>

      {/* Sticky action bar la baza modalului */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-end gap-2 z-20">
        <Button
          onClick={() => onReject(application.id)}
          className="bg-red-600 sm:w-auto w-full"
        >
          Respinge
        </Button>
        <Button
          onClick={() => onManualReview(application.id)}
          className="bg-yellow-500 sm:w-auto w-full"
        >
          Manual Review
        </Button>
        <Button
          onClick={() => handleScrollToDocs()}
          className="bg-indigo-600 sm:w-auto w-full"
        >
          Solicită Documente
        </Button>
        <Button
          onClick={() => onSendToAML(application.id)}
          className="bg-purple-600 sm:w-auto w-full "
        >
          Trimite la AML
        </Button>
        <Button
          onClick={() => onApprove(application.id)}
          className="bg-green-600 sm:w-auto w-full"
        >
          Aprobă
        </Button>
      </div>
    </Modal>
  );
}
