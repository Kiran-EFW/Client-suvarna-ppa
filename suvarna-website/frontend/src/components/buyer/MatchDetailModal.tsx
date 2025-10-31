import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Loader2 } from 'lucide-react';
import type { Match } from '@/lib/buyerApi';

interface MatchDetailModalProps {
  match: Match;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTermsAgreed: (matchId: string) => Promise<void>;
}

export default function MatchDetailModal({ match, open, onOpenChange, onTermsAgreed }: MatchDetailModalProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!termsAccepted) return;
    setIsSubmitting(true);
    try {
      await onTermsAgreed(match.id);
    } catch (error) {
      console.error('Error agreeing to terms:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => onOpenChange(false)}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="text-2xl">{match.seller.companyName}</CardTitle>
          <CardDescription>
            {match.seller.projectType} Project • {match.seller.capacity} MW
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Project Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Project Type:</span>
                  <p className="font-medium">{match.seller.projectType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Capacity:</span>
                  <p className="font-medium">{match.seller.capacity} MW</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium">{match.seller.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">State:</span>
                  <p className="font-medium">{match.seller.state}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Asking Price:</span>
                  <p className="font-medium text-xl text-primary">
                    ₹{match.seller.askingPrice.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {!match.termsAgreed && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="bg-muted p-4 rounded-lg text-center text-sm text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Contact information will be revealed after agreeing to terms</p>
                </div>
              </div>
            )}

            {match.termsAgreed && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Contact Person:</span>
                    <p className="font-medium">{match.seller.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">
                      <a href={`mailto:${match.seller.contactEmail}`} className="text-primary hover:underline">
                        {match.seller.contactEmail}
                      </a>
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium">
                      <a href={`tel:${match.seller.contactPhone}`} className="text-primary hover:underline">
                        {match.seller.contactPhone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!match.termsAgreed && (
            <div className="border-t pt-4">
              <div className="flex items-start gap-3 mb-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I have read and agree to the terms and conditions set forth by Suvarna Capital Advisors LLP.
                  By agreeing, I understand that I will receive the full contact details of the seller.
                </label>
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!termsAccepted || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Agree & View Full Details'
                )}
              </Button>
            </div>
          )}

          {match.termsAgreed && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg mb-4">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Terms Agreed On: {new Date(match.termsAgreedAt!).toLocaleDateString()}</span>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

