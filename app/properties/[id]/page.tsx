'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyStatusBadge, VerificationBadge } from '@/components/shared/status-badges';
import { EmptyState } from '@/components/shared/empty-states';
import { properties, leads, formatINR, formatDate, formatINRFull } from '@/lib/mock-data';
import {
  ArrowLeft, MapPin, Home, BedDouble, Maximize, Bath, Car, Building, Eye,
  Phone, Mail, Calendar, CheckCircle2, XCircle, Share2, Edit, FileText,
  IndianRupee, Layers, Sofa, Clock, Sparkles, ChevronRight, User,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const property = properties.find(p => p.id === params.id);
  const [activeTab, setActiveTab] = useState('overview');

  const matchedLeads = useMemo(() => {
    if (!property) return [];
    return leads.filter(l =>
      l.location === property.location &&
      l.propertyType === property.propertyType &&
      l.budget >= property.price * 0.7 &&
      l.budget <= property.price * 1.3 &&
      l.status !== 'LOST' && l.status !== 'CLOSED'
    ).slice(0, 5);
  }, [property]);

  if (!property) {
    return (
      <EmptyState
        title="Property not found"
        description="This property may have been removed."
        action={<Button onClick={() => router.push('/properties')} variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties</Button>}
      />
    );
  }

  const verificationItems = [
    { key: 'ownerVerified', label: 'Owner Verified' },
    { key: 'propertyVerified', label: 'Property Verified' },
    { key: 'documentsVerified', label: 'Documents Verified' },
    { key: 'locationVerified', label: 'Location Verified' },
    { key: 'priceVerified', label: 'Price Verified' },
    { key: 'availabilityVerified', label: 'Availability Verified' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/properties" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Properties
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{property.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Property Header */}
          <Card className="overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
              <Home className="w-20 h-20 text-primary/20" />
              <div className="absolute top-4 right-4 flex gap-2">
                <PropertyStatusBadge status={property.status} />
                <Badge variant="outline" className="bg-card/90">{property.propertyType.replace('_', ' ')}</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground mb-1">{property.title}</h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {property.address}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.info('Share link copied')}><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.info('Edit mode would open')}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                </div>
              </div>
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="matches">Matched Leads ({matchedLeads.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Price', value: formatINR(property.price), icon: IndianRupee },
                  { label: property.rent ? 'Rent' : 'Expected', value: property.rent ? formatINR(property.rent) : formatINR(property.expectedPrice || property.price), icon: IndianRupee },
                  { label: 'Bedrooms', value: property.bedrooms ? `${property.bedrooms} BHK` : '—', icon: BedDouble },
                  { label: 'Bathrooms', value: property.bathrooms || '—', icon: Bath },
                  { label: 'Built-up Area', value: property.builtUpArea ? `${property.builtUpArea} sqft` : '—', icon: Maximize },
                  { label: 'Carpet Area', value: property.carpetArea ? `${property.carpetArea} sqft` : '—', icon: Maximize },
                  { label: 'Floor', value: property.floor ? `${property.floor}/${property.totalFloors}` : '—', icon: Layers },
                  { label: 'Parking', value: property.parking ? `${property.parking} spaces` : '—', icon: Car },
                  { label: 'Age', value: property.age !== undefined ? `${property.age} yrs` : '—', icon: Clock },
                  { label: 'Furnishing', value: property.furnishing?.replace('_', ' ') || '—', icon: Sofa },
                  { label: 'Availability', value: property.availability, icon: Calendar },
                  { label: 'Views', value: property.views, icon: Eye },
                ].map(item => (
                  <div key={item.label} className="rounded-lg border p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              {property.amenities.length > 0 && (
                <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-base">Amenities</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map(a => (
                        <Badge key={a} variant="outline" className="text-xs">
                          <Sparkles className="w-3 h-3 mr-1" /> {a}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-base">Description</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p></CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {verificationItems.map(item => {
                      const verified = property.verification[item.key as keyof typeof property.verification];
                      return (
                        <div key={item.key} className="flex items-center gap-3 p-3 rounded-lg border">
                          {verified ? (
                            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{verified ? 'Verified' : 'Pending verification'}</p>
                          </div>
                          {!verified && (
                            <Button size="sm" variant="outline" onClick={() => toast.info('Verification request sent')}>
                              Verify
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Verification status is based on internal checks. EstateOS does not make legal claims about property documents.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardContent className="pt-6">
                  <EmptyState icon={FileText} title="No documents uploaded" description="Upload property documents like sale deed, tax receipts, and occupancy certificate." />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matches" className="space-y-3">
              {matchedLeads.length === 0 ? (
                <EmptyState icon={User} title="No matched leads" description="No active leads match this property's criteria." />
              ) : (
                matchedLeads.map((lead, i) => {
                  const score = Math.min(95 - (i * 5), 99);
                  return (
                    <Link key={lead.id} href={`/leads/${lead.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg border hover:border-primary/40 hover:bg-muted/30 transition-base">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{lead.location} · Budget: {formatINR(lead.budget)}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-success rounded-full" style={{ width: `${score}%` }} />
                          </div>
                          <span className="text-sm font-bold text-success tabular-nums">{score}%</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 space-y-4 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Pricing</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-bold">{formatINRFull(property.price)}</span></div>
              {property.expectedPrice && <div className="flex justify-between"><span className="text-muted-foreground">Expected</span><span>{formatINR(property.expectedPrice)}</span></div>}
              {property.rent && <div className="flex justify-between"><span className="text-muted-foreground">Rent</span><span>{formatINR(property.rent)}/mo</span></div>}
              {property.deposit && <div className="flex justify-between"><span className="text-muted-foreground">Deposit</span><span>{formatINR(property.deposit)}</span></div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Owner Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{property.ownerName}</p>
              <p className="text-muted-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {property.ownerPhone}</p>
              <div className="pt-2 flex items-center gap-2">
                <VerificationBadge verified={property.verification.ownerVerified} label="Owner Verified" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Assigned Agent</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <p className="font-medium">{property.assignedAgentName}</p>
              <p className="text-muted-foreground text-xs mt-1">Since {formatDate(property.createdAt)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Performance</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Views</span><span className="font-medium">{property.views}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Matches</span><span className="font-medium">{property.matches}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Listed</span><span className="text-xs">{formatDate(property.createdAt)}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
