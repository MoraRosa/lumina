import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, MessageSquare, Trash2 } from "lucide-react";
import {
  getNewsletterSignups,
  getContactSubmissions,
  downloadNewsletterSignupsCSV,
  downloadContactSubmissionsCSV,
  clearNewsletterSignups,
  clearContactSubmissions,
} from "@/lib/shopifyCustomer";

const AdminSubmissions = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newsletterSignups, setNewsletterSignups] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setNewsletterSignups(getNewsletterSignups());
    setContactSubmissions(getContactSubmissions());
  };

  const handleClearNewsletter = () => {
    if (confirm('Are you sure you want to clear all newsletter signups? This cannot be undone.')) {
      clearNewsletterSignups();
      loadData();
    }
  };

  const handleClearContact = () => {
    if (confirm('Are you sure you want to clear all contact submissions? This cannot be undone.')) {
      clearContactSubmissions();
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Form Submissions</h1>
        <p className="text-muted-foreground mb-8">
          View and export newsletter signups and contact form submissions to import into Shopify
        </p>

        {/* Newsletter Signups */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Newsletter Signups ({newsletterSignups.length})
                </CardTitle>
                <CardDescription>
                  Download as CSV and import to Shopify Customers with "Accepts Marketing" enabled
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={downloadNewsletterSignupsCSV}
                  disabled={newsletterSignups.length === 0}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button
                  onClick={handleClearNewsletter}
                  disabled={newsletterSignups.length === 0}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {newsletterSignups.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No newsletter signups yet</p>
            ) : (
              <div className="space-y-2">
                {newsletterSignups.map((signup, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{signup.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(signup.subscribedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Submissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Form Submissions ({contactSubmissions.length})
                </CardTitle>
                <CardDescription>
                  Download as CSV and import to Shopify Customers with notes
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={downloadContactSubmissionsCSV}
                  disabled={contactSubmissions.length === 0}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button
                  onClick={handleClearContact}
                  disabled={contactSubmissions.length === 0}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {contactSubmissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No contact submissions yet</p>
            ) : (
              <div className="space-y-4">
                {contactSubmissions.map((submission, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{submission.name}</p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold text-sm mb-1">{submission.subject}</p>
                    <p className="text-sm">{submission.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminSubmissions;

