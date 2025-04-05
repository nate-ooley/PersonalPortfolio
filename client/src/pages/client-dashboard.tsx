import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClientProject } from "@shared/schema";
import { Loader2, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);
  
  // Fetch client projects for the logged-in user
  const { data: clientProjects, isLoading, error } = useQuery<{ success: boolean, data: ClientProject[] }>({
    queryKey: ['/api/client-projects'],
    // Only run query if user is logged in
    enabled: !!user,
  });
  
  // Group projects by status
  const activeProjects = clientProjects?.data?.filter(p => 
    p.status === 'in_progress' || p.status === 'not_started'
  ) || [];
  
  const completedProjects = clientProjects?.data?.filter(p => 
    p.status === 'completed'
  ) || [];

  if (authLoading || isLoading) {
    return (
      <MainLayout>
        <div className="container py-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-lg text-muted-foreground">Loading your projects...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!user) {
    // Return a loading state instead of null
    return (
      <MainLayout>
        <div className="container py-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-lg text-muted-foreground">Redirecting to login...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="container py-20 min-h-screen">
          <div className="max-w-lg mx-auto text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold mt-4">Error Loading Projects</h2>
            <p className="mt-2 text-muted-foreground">
              We're having trouble loading your project data. Please try again later.
            </p>
            <Button 
              className="mt-6"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8 md:py-12 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.fullName || user.username}
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Projects ({activeProjects.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed Projects ({completedProjects.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeProjects.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No active projects found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedProjects.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No completed projects found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

function ProjectCard({ project }: { project: ClientProject }) {
  // Calculate progress percentage
  const progressPercent = project.progress || 0;
  
  // Format dates
  const startDate = project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set';
  const endDate = project.endDate
    ? new Date(project.endDate).toLocaleDateString() 
    : 'To be determined';
  
  // Determine status badge color
  const getStatusBadge = () => {
    switch (project.status) {
      case 'not_started':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Not Started</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'review':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Review</Badge>;
      default:
        return <Badge variant="outline">{project.status}</Badge>;
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Started: {startDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Expected: {endDate}</span>
            </div>
          </div>
          
          {project.outcome && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <h4 className="text-sm font-medium mb-1">Latest Outcome</h4>
              <p className="text-sm text-muted-foreground">{project.outcome}</p>
            </div>
          )}
          
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}