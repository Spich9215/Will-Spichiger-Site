// client/src/data/site-architecture-diagram.ts
// Raw draw.io (mxGraph) XML for the Site Architecture diagram, rendered client-side
// by the diagrams.net viewer script in SiteArchitecture.tsx. Source of truth for
// edits is "Claude outputs/Personal_Site_Architecture.drawio" -- open that file in
// draw.io/diagrams.net to make changes, then copy the updated XML back in here.

export const siteArchitectureDiagramXml = `<mxfile host="app.diagrams.net">
  <diagram name="Page-1" id="AgSHv01E5WO8RlFoDWFS">
    <mxGraphModel grid="1" page="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" pageScale="1" pageWidth="1500" pageHeight="1080" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Title -->
        <mxCell id="title1" parent="1" style="text;html=1;fontSize=20;fontStyle=1;align=left;verticalAlign=middle;fontColor=#232F3E;" value="williamtaylorspichiger.com &#8212; Site Architecture" vertex="1">
          <mxGeometry x="40" y="10" width="700" height="30" as="geometry" />
        </mxCell>

        <!-- Section headers -->
        <mxCell id="h1" parent="1" style="text;html=1;fontSize=14;fontStyle=1;align=left;verticalAlign=middle;fontColor=#555555;" value="Deploy Pipeline (CI/CD)" vertex="1">
          <mxGeometry x="40" y="60" width="300" height="24" as="geometry" />
        </mxCell>
        <mxCell id="h2" parent="1" style="text;html=1;fontSize=14;fontStyle=1;align=left;verticalAlign=middle;fontColor=#555555;" value="Runtime Request Flow" vertex="1">
          <mxGeometry x="40" y="420" width="300" height="24" as="geometry" />
        </mxCell>
        <mxCell id="h3" parent="1" style="text;html=1;fontSize=14;fontStyle=1;align=left;verticalAlign=middle;fontColor=#555555;" value="Infrastructure, Regions &amp; Availability Zones" vertex="1">
          <mxGeometry x="40" y="730" width="500" height="24" as="geometry" />
        </mxCell>

        <!-- ===== Row 1: Deploy pipeline actors (y 100-190) ===== -->
        <mxCell id="dev" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#24292f;strokeColor=#1b1f23;fontColor=#ffffff;fontSize=12;" value="Developer&#10;(VS Code)" vertex="1">
          <mxGeometry x="40" y="100" width="150" height="70" as="geometry" />
        </mxCell>

        <mxCell id="ghrepo" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#24292f;strokeColor=#1b1f23;fontColor=#ffffff;fontSize=12;" value="GitHub Repo&#10;(main branch)" vertex="1">
          <mxGeometry x="260" y="100" width="150" height="70" as="geometry" />
        </mxCell>

        <mxCell id="ghactions" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2b3137;strokeColor=#1b1f23;fontColor=#ffffff;fontSize=12;" value="GitHub Actions&#10;(build + deploy workflow)" vertex="1">
          <mxGeometry x="480" y="100" width="170" height="70" as="geometry" />
        </mxCell>

        <mxCell id="iam" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DD344C;strokeColor=#ffffff;fontColor=#ffffff;fontSize=12;" value="IAM User&#10;(deploy access keys)" vertex="1">
          <mxGeometry x="960" y="100" width="170" height="70" as="geometry" />
        </mxCell>

        <!-- Secrets note: placed under IAM, well clear of the ghactions-to-runtime corridor -->
        <mxCell id="secretsnote" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#999999;fontColor=#333333;fontSize=10;align=left;verticalAlign=top;spacing=6;dashed=1;" value="GitHub Actions Secrets:&#10;&#8226; AWS_ACCESS_KEY_ID&#10;&#8226; AWS_SECRET_ACCESS_KEY&#10;&#8226; VITE_Maps_API_KEY&#10;&#8226; CLOUDFRONT_DISTRIBUTION_ID" vertex="1">
          <mxGeometry x="960" y="210" width="190" height="110" as="geometry" />
        </mxCell>

        <!-- ===== Row 2: Runtime request path (y 400-478 for icons) ===== -->
        <mxCell id="visitor" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#4a5568;strokeColor=#333333;fontColor=#ffffff;fontSize=12;" value="Visitor&#10;(Browser)" vertex="1">
          <mxGeometry x="40" y="400" width="150" height="70" as="geometry" />
        </mxCell>

        <mxCell id="route53" parent="1" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#8C4FFF;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.route_53;" value="Route 53&#10;(DNS &#8211; Alias records)&#10;Global service" vertex="1">
          <mxGeometry x="280" y="397" width="78" height="78" as="geometry" />
        </mxCell>

        <mxCell id="cloudfront" parent="1" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#8C4FFF;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudfront;" value="CloudFront&#10;(CDN + HTTPS, OAC, SPA routing)&#10;Global edge network" vertex="1">
          <mxGeometry x="526" y="397" width="78" height="78" as="geometry" />
        </mxCell>

        <mxCell id="acm" parent="1" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#DD344C;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.certificate_manager;" value="ACM Certificate&#10;(us-east-1, required for CloudFront)" vertex="1">
          <mxGeometry x="526" y="600" width="78" height="78" as="geometry" />
        </mxCell>

        <mxCell id="s3" parent="1" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#7AA116;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.s3;" value="S3 Bucket&#10;(private, origin)&#10;Region: us-east-1" vertex="1">
          <mxGeometry x="780" y="397" width="78" height="78" as="geometry" />
        </mxCell>

        <!-- Google Maps: external third-party service, called directly by the browser -->
        <mxCell id="gmaps" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#4285F4;strokeColor=#1a56c4;fontColor=#ffffff;fontSize=12;" value="Google Maps&#10;JavaScript API&#10;(Travel / GPX page)" vertex="1">
          <mxGeometry x="1020" y="392" width="180" height="80" as="geometry" />
        </mxCell>

        <!-- Goodreads: external third-party feed, pulled by the build itself (prebuild script), not the browser -->
        <mxCell id="goodreads" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#553818;strokeColor=#3a2510;fontColor=#ffffff;fontSize=12;" value="Goodreads RSS Feed&#10;(public &quot;read&quot; shelf)&#10;fetched during CI build" vertex="1">
          <mxGeometry x="700" y="210" width="190" height="80" as="geometry" />
        </mxCell>

        <!-- ===== Edges: Deploy pipeline ===== -->
        <mxCell id="e1" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#333333;" value="git push (main)" edge="1" source="dev" target="ghrepo">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-12" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e2" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#333333;" value="triggers workflow&#10;on push to main" edge="1" source="ghrepo" target="ghactions">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-16" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e3" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#333333;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" value="AWS credentials" edge="1" source="iam" target="ghactions">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-16" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e4" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;fontSize=10;endArrow=none;strokeColor=#999999;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" value="" edge="1" source="iam" target="secretsnote">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ===== Edges: Deploy pipeline reaching into runtime resources (routed down the ghactions column, well left of the IAM/secrets column) ===== -->
        <mxCell id="e5" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;fontSize=11;endArrow=block;strokeColor=#B85C00;exitX=0.75;exitY=1;entryX=0.5;entryY=0;" value="npm run build +&#10;aws s3 sync --delete" edge="1" source="ghactions" target="s3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="20" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e6" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;fontSize=11;endArrow=block;strokeColor=#B85C00;exitX=0.25;exitY=1;entryX=0.5;entryY=0;" value="aws cloudfront&#10;create-invalidation" edge="1" source="ghactions" target="cloudfront">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-20" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e11" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;fontSize=10;endArrow=block;strokeColor=#999999;exitX=1;exitY=0.5;entryX=0.5;entryY=0;" value="API key baked into&#10;build (VITE_Maps_API_KEY)" edge="1" source="secretsnote" target="gmaps">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e13" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;fontSize=10;endArrow=block;strokeColor=#8a5a2b;exitX=0.5;exitY=1;entryX=0;entryY=0.5;" value="prebuild script fetches&#10;&quot;read&quot; shelf RSS" edge="1" source="ghactions" target="goodreads">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ===== Edges: Runtime request path ===== -->
        <mxCell id="e7" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#333333;" value="DNS lookup" edge="1" source="visitor" target="route53">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-14" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e8" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#333333;" value="Alias record (A)" edge="1" source="route53" target="cloudfront">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-14" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e9" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#333333;" value="OAC-signed&#10;origin fetch" edge="1" source="cloudfront" target="s3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-14" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e10" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;fontSize=11;endArrow=block;strokeColor=#333333;" value="TLS certificate" edge="1" source="acm" target="cloudfront">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="16" y="0" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="e12" parent="1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;fontSize=11;endArrow=block;strokeColor=#1a56c4;exitX=1;exitY=0.3;entryX=0;entryY=0.5;" value="client-side map/GPX&#10;requests (direct, bypasses AWS)" edge="1" source="visitor" target="gmaps">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-40" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- ===== Row 3: Infrastructure / Regions / AZs (y 770+) ===== -->
        <mxCell id="regionbox" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#232F3E;dashed=1;verticalAlign=top;align=left;fontStyle=1;fontSize=12;spacingLeft=10;spacingTop=8;" value="AWS Region: us-east-1 (N. Virginia)&#10;&#10;&#8226; S3 bucket and ACM certificate live&#10;   here (ACM must be in us-east-1&#10;   for CloudFront to use it).&#10;&#8226; S3 automatically stores every object&#10;   across 3+ Availability Zones within&#10;   the region &#8212; there's no AZ to pick&#10;   and no single-AZ failure risk." vertex="1">
          <mxGeometry x="40" y="770" width="440" height="210" as="geometry" />
        </mxCell>

        <mxCell id="globalbox" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#8C4FFF;dashed=1;verticalAlign=top;align=left;fontStyle=1;fontSize=12;spacingLeft=10;spacingTop=8;" value="Global services (not tied to one region/AZ)&#10;&#10;&#8226; CloudFront &#8212; 400+ edge locations&#10;   worldwide; serves from whichever&#10;   is closest to the visitor.&#10;&#8226; Route 53 &#8212; globally distributed&#10;   authoritative DNS.&#10;&#8226; IAM &#8212; global, not region-scoped." vertex="1">
          <mxGeometry x="520" y="770" width="400" height="210" as="geometry" />
        </mxCell>

        <mxCell id="vpcwarning" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF3E0;strokeColor=#B85C00;fontColor=#7A3E00;dashed=1;verticalAlign=top;align=left;fontStyle=0;fontSize=12;spacingLeft=10;spacingTop=8;" value="&#9888; Default VPC (us-east-1) &#8212; not part of this architecture&#10;&#10;This site (S3 + CloudFront + Route 53) needs&#10;no VPC, EC2, or NAT Gateway to run.&#10;&#10;The ~$3.60/mo charge is most likely an idle,&#10;unattached Elastic IP left in the default VPC&#10;(a single unused EIP bills &#8776;$0.005/hr &#8776; $3.65/mo).&#10;A NAT Gateway would cost far more (&#8776;$32+/mo),&#10;so this is almost certainly an EIP.&#10;&#10;Action: VPC console &#8594; Elastic IPs (and NAT&#10;Gateways) &#8594; release/delete anything unattached." vertex="1">
          <mxGeometry x="960" y="770" width="460" height="260" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
