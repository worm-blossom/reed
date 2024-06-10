import { expressions } from "macromaniajsx/jsx-runtime";
import {
Access,
  AccessStruct,
  AccessTuple,
  Application,
  ApplicationRaw,
  Bib,
  Bibliography,
  BibScope,
  BlankPattern,
  Br,
  ChoiceType,
  Cite,
  CommentLine,
  DefFunction,
  DefType,
  DefValue,
  DefVariant,
  Dfn,
  Else,
  ElseIf,
  Enum,
  FunctionItemUntyped,
  Gt,
  I,
  If,
  Img,
  Interface,
  Let,
  LetRaw,
  Loc,
  Lt,
  Match,
  QualifiedMember,
  RefLoc,
  S,
  Self,
  SpliceLoc,
  Struct,
  StructDef,
  Sup,
  Tuple,
  TupleStruct,
  TupleType,
  Type,
  TypeAnnotation,
  TypeApplication,
  While,
  Wip,
} from "../deps.ts";
import { Assign } from "../deps.ts";
import {
  A,
  B,
  Code,
  Context,
  Counter,
  CssDependency,
  Def,
  Em,
  EscapeHtml,
  Expression,
  Expressions,
  FunctionItem,
  H,
  Hsection,
  JsDependency,
  Li,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  Ol,
  P,
  PreviewScope,
  Pseudocode,
  R,
  Rb,
  Rc,
  Rcb,
  ResolveAsset,
  Return,
  Rs,
  Rsb,
  Sidenote,
  Sidenotes,
  Span,
  Strong,
  Ul,
  WaitForMarginales,
} from "../deps.ts";
import { ArticleTemplate } from "./articleTemplate.tsx";
import {
  BigO,
  Curly,
  Cyan,
  Magenta,
  Mathcal,
  Mathfrak,
  MCeil,
  MFrac,
  MFunDef,
  MLog,
  MSet,
  NoWrap,
  Np,
  Orange,
  Pink,
  Quotes,
  Rank,
  TreeChild,
  TreeChildren,
  TreeItem,
} from "./macros.tsx";
import { TreeItems } from "./macros.tsx";
import { GeoDistribution } from "./macros.tsx";

const ctx = new Context();

/*
Create a custom annotation macro.
*/
function Alj(
  { children, inline }: { children?: Expressions; inline?: boolean },
): Expression {
  return (
    <Wip
      fg="#6804cc"
      bg="#ecdbfc"
      wrap={(_ctx, inner) => <>alj: {inner}</>}
      children={children}
      inline={inline}
    />
  );
}

function Cjqf(
  { children, inline }: { children?: Expressions; inline?: boolean },
): Expression {
  return (
    <Wip
      fg="#67595E" // Coffee pot
      bg="#EED6D3" // Dusty rose
      wrap={(_ctx, inner) => <>cjqf: {inner}</>} // Carson John Quentry Farmer :)
      children={children}
      inline={inline}
    />
  );
}

/*
Create macros for figures (which includes theorem-like blocks).
*/

const figureCounter = new Counter("figure-counter", 0);
const Fig = makeFigureMacro(ctx, {
  figureCounter: figureCounter,
  numberingInfo: {
    r: "Figure",
    rb: "Figure",
    rs: "Figures",
    rsb: "Figures",
    render: makeNumberingRenderer(),
  },
});

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title={<>Reed Specification</>}
    titleId="title"
    abstract={
      <>
        <PreviewScope>
          <P>
            <Bib item="meyer2023sok">Prefix authentication schemes</Bib> — aka append-only logs, or transparency logs — are cryptographic schemes to efficiently authenticate total ordering between events. For any two events from a single event stream, you can provide a short digest to certify that one happened before the other (as opposed to them happening concurrently). <Def n="name" r="reed">Reed</Def> is a lightweigh specification for implementing the <Bib item="meyer2023better"><M>SLLS_3</M> scheme</Bib>, a scheme that produces shorter proofs than the traditional <Bib item="laurie2021rfc">certificate transparency logs</Bib>.
          </P>
        </PreviewScope>

        <P>
          <Rb n="name"/> supersedes the earlier <A href="https://github.com/AljoschaMeyer/bamboo?tab=readme-ov-file#bamboo-">Bamboo</A> format. <Rb n="name"/> is more efficient than Bamboo, more minimalistic in feature set, and generic over any particular cryptographic primitives. Bamboo was originally designed for efficient data replication, but I have since come to prefer <A href="https://willowprotocol.org/">more flexible replication technologies</A>, so <R n="name"/> sheds its data replication origins.
        </P>

        <P>
          There will be graphs.
        </P>
      </>
    }
    authors={[
      {
        name: "Aljoscha Meyer",
        email: <A href="https://github.com/AljoschaMeyer/reed">https://github.com/AljoschaMeyer/reed</A>,
      },
    ]}
  >
    <Img
      clazz="veryWide"
      src={<ResolveAsset asset={["graphics", "splash.svg"]} />}
    />

    <Hsection n="introduction" title="Introduction" noNumbering>
      <P>
        How about a dense one-paragraph summary, followed by a step-by-step explanation with pictures?
      </P>

      <P>
        <Rb n="name"/> is a <Bib item="meyer2023sok">transitive prefix authentication scheme</Bib>: given a sequence of events, we build a directed acyclic graph (DAG) whose edges correspond to one object containing a secure hash of the other object (i.e., a Merkle-DAG). For each event, we assign a <Dfn>commitment vertex</Dfn> which has a path to the event, as well as paths to the commitment vertices of all earlier events. Given the commitment vertices of two events and the out-neighborhood of the path between them, we can reconstruct the hashes of all path vertices, thus proving that the first event did indeed happen before the other. <Rb n="name"/> guarantees that the out-neighborhoods of these paths are small, i.e., verification is efficient.
      </P>

      <P>
        Let’s break this down step by step. We start out with an ordered sequence of events, nine in the following example:
      </P>

      <Fig
        n="fig_events"
        caption={<>
          <P>
            A sequence of nine events. Nothing interesting yet.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "events.svg"]} />}
        />
      </Fig>

      <P>
        These events will form the basis of a graph. To make sure that graph will give us efficient prefix authentication, we first need to add some additional vertices. You do not yet need to care <Em>how</Em> we determine these, we are just getting a feel for the general concepts here.
      </P>

      <Fig
        n="fig_vertices"
        caption={<>
          <P>
            We added some further vertices, according to rules we examine later.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "vertices.svg"]} />}
        />
      </Fig>

      <P>
        Next, we add edges to turn these vertices into a useful graph. We are building a Merkle-DAG, which means that each vertex is labeled with a secure hash of the concatenation of the labels of its <Sidenote note={<>This is a slight oversimplification, <R n="name"/> proper also concatenates some metadata into the labels.</>}>out-neighbors</Sidenote>. We need not draw the labels, since they are derived deterministically from the structure of the graph.
      </P>

      <Fig
        n="fig_edges"
        caption={<>
          <P>
            We add some edges. These follow a useful pattern, I promise. Can you smell the ternary almost-skip-list already?
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "edges.svg"]} />}
        />
      </Fig>

      <P>
        Each event has an associated commitment vertex.
      </P>

      <Fig
        n="fig_commitments"
        caption={<>
          <P>
            Events and their dedicated commitment vertices, grouped together. Not that each event is (trivially) reachable from its commitment vertex, and each commitment vertex is reachable from the commitment vertices of all later events.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "commitments.svg"]} />}
        />
      </Fig>

      <P>
        To illustrate prefix authentication, we now arbitrarily select two events and highlight the path between their commitment vertices.
      </P>

      <Fig
        n="fig_path"
        caption={<>
          <P>
            The shortest path between the commitment vertices of events <M>8</M> and <M>2</M>.
          </P>
        </>}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "path.svg"]} />}
        />
      </Fig>

      <P>
        Given the (labels of the) out-neighborhood of that path, we can reconstruct the labels of the path vertices. In particular, we can reconstruct the labels of the commitment vertices of events <M>8</M> and <M>2</M>.
      </P>

      <Pseudocode n="introduction_verification_example">
        <Loc>
          <LetRaw lhs="label_2_0">
            <ApplicationRaw fun="hash" args={[
              <ApplicationRaw fun="concat" args={[
                <ApplicationRaw fun="label" args={[<M>(1, 0)</M>]}/>,
                <ApplicationRaw fun="label" args={[<M>2</M>]}/>,
              ]}/>
            ]} />
          </LetRaw>
        </Loc>
        <Loc>
          <LetRaw lhs="label_3_0">
            <ApplicationRaw fun="hash" args={[
              <ApplicationRaw fun="concat" args={[
                "label_2_0",
                <ApplicationRaw fun="label" args={[<M>3</M>]}/>,
              ]}/>
            ]} />
          </LetRaw>
        </Loc>
        <Loc>
          <LetRaw lhs="label_3_1">
            <ApplicationRaw fun="hash" args={[
              <ApplicationRaw fun="concat" args={[
                <ApplicationRaw fun="label" args={[<M>(1, 0)</M>]}/>,
                "label_3_0",
              ]}/>
            ]} />
          </LetRaw>
        </Loc>
        <Loc>
          <LetRaw lhs="label_6_1">
            <ApplicationRaw fun="hash" args={[
              <ApplicationRaw fun="concat" args={[
                "label_3_1",
                <ApplicationRaw fun="label" args={[<M>(6, 0)</M>]}/>,
              ]}/>
            ]} />
          </LetRaw>
        </Loc>
        <Loc>
          <LetRaw lhs="label_7_0">
            <ApplicationRaw fun="hash" args={[
              <ApplicationRaw fun="concat" args={[
                "label_6_1",
                <ApplicationRaw fun="label" args={[<M>7</M>]}/>,
              ]}/>
            ]} />
          </LetRaw>
        </Loc>
        <Loc>
          <LetRaw lhs="label_8_0">
            <ApplicationRaw fun="hash" args={[
              <ApplicationRaw fun="concat" args={[
                "label_7_0",
                <ApplicationRaw fun="label" args={[<M>8</M>]}/>,
              ]}/>
            ]} />
          </LetRaw>
        </Loc>
      </Pseudocode>

      <P>
        If the hash function is secure, then it is computationally infeasible to <Em>fabricate</Em> labels that allow reconstructing a path between two vertices. Hence, the labels of the out-neighborhood of the path serve as an unforgeable proof that event <M>2</M> happened before event <M>8</M>. Neat!
      </P>
    </Hsection>

    <Hsection n="spec" title="Specification" noNumbering>
      <PreviewScope>
        <P>
          We assume <DefFunction n="hash"/> to be a secure hash function that maps arbitrary bytestrings to fixed-with bytestrings. We call an output of <R n="hash"/> a <Def n="digest" rs="digests"/>.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          We<Marginale>Compare <Rc n="fig_events"/>.</Marginale> define everything in terms of a sequence <DefValue n="events"/> of <Rs n="event"/>, where an <Def n="event" rs="events"/> is an arbitrary bytestring. The sequence <R n="events"/> must have a <DefValue n="length"/> between one and <M post=",">2^<Curly>64</Curly> - 1</M> both inclusive. We number <Rs n="event"/> starting at <M post=",">1</M> because the math ends up much nicer that way.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          The<Marginale>Compare <Rc n="fig_vertices"/>.</Marginale> set <DefType n="InnerVertices"/> is the set of all pairs <M>(<DefValue n="x"/>, <DefValue n="y"/>)</M> such that <NoWrap><M>1 \leq <R n="x"/> \leq <R n="length"/></M></NoWrap> and <M>3^<Curly><R n="y"/></Curly></M> divides <R n="x"/>. We call <M>(<R n="x"/>, 0)</M> the <Def n="commitment" r="commitment vertex" rs="commitment vertices"/><Marginale>Compare <Rc n="fig_commitments"/>.</Marginale> of <R n="event"/> <R n="x"/>.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Let <M>(<DefValue n="x3" r="x"/>, <DefValue n="y3" r="y"/>)</M> be in <R n="InnerVertices"/>. The <Def n="predecessor" r="predecessor vertex" rs="predecessor vertices"/><Marginale>Compare <Rc n="fig_edges"/> (light edges).</Marginale> of <M>(<R n="x3"/>, <R n="y3"/>)</M> is the <R n="event"/> <R n="x3"/> if <M><R n="y3"/> = 0</M>, or the inner vertex <M>(<R n="x3"/>, <R n="y3"/> - 1)</M>, otherwise.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Let <M>(<DefValue n="x2" r="x"/>, <DefValue n="y2" r="y"/>)</M> be in <R n="InnerVertices"/> such that <M>(<R n="x2"/>, <R n="y2"/> + 1)</M> is <Em>not</Em> in <R n="InnerVertices"/>. Then we call <M>(<R n="x2"/>, <R n="y2"/>)</M> the <Def n="topmost" r="topmost vertex"/> of <R n="event"/> <R n="x2"/>.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Let <M>(<DefValue n="x4" r="x"/>, <DefValue n="y4" r="y"/>)</M> be in <R n="InnerVertices"/>, with <M post="."><R n="x4"/> \geq 2</M> The <Def n="jump" r="jump vertex" rs="jump vertices"/><Marginale>Compare <Rc n="fig_edges"/> (dark edges).</Marginale> of <M>(<R n="x4"/>, <R n="y4"/>)</M> is the <R n="topmost"/> of <R n="event"/> <M post="."><R n="x4"/> - 3^<Curly><R n="y4"/></Curly></M>
        </P>
      </PreviewScope>

      <Fig
        n="fig_slls"
        caption={<>
          <P style="text-align: center;">
            A graph depicting the first few vertices for a long sequence of <R n="events">events</R>. The light, vertical edges connect each vertex to its <R n="predecessor"/>, the darker edges connect each vertex to its <R n="jump"/>.
          </P>
        </>}
        wrapperTagProps={{clazz: "veryWide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "slls3.svg"]} />}
        />
      </Fig>

      <PreviewScope>
        <P>
          The <DefFunction n="label"/> of an <R n="event"/> <DefValue n="label_event" r="e"/> is the <R n="hash"/> of the concatenation of<Ul>
            <Li>the byte <Code>0x00</Code>, and</Li>
            <Li><R n="label_event"/>.</Li>
          </Ul>
        </P>
        <P>
          The <DefFunction n="label" fake/> of an inner vertex <M><DefValue n="label_v" r="v"/> := (<DefValue n="x5" r="x"/>, <DefValue n="y5" r="y"/>)</M> is the <R n="hash"/> of the concatenation of<Ul>
            <Li>the byte <Code>0x01</Code>,</Li>
            <Li>the <R n="label"/> of the <R n="predecessor"/> of <R n="label_v"/>,</Li>
            <Li>the <R n="label"/> of the <R n="jump"/> of <R n="label_v"/> — or the <R n="hash"/> of the empty string, if <M post=","><R n="label_v"/> = (1, 0)</M></Li>
            <Li>the big-endian encoding of <R n="x5"/><Marginale>
                Incorporating <R n="x5"/> and <R n="y5"/> in the labels is not needed for the security of the scheme, but it comes with a practical benefit: given any label of some inner vertex, you can prove its position in the graph by supplying the labels of its <R n="predecessor"/> and <R n="jump"/>.
              </Marginale> as an unsigned 64-bit integer, and</Li>
            <Li>the encoding of <R n="y5"/> as an unsigned 8-bit integer.</Li>
          </Ul>
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          You can find the shortest path from one vertex to another with a greedy step-by-step algorithm. Starting at some vertex, go to its <R n="jump"/>. If that overshoots, go to its <R n="predecessor"/> instead. Iterate until you reached the target vertex. Formally:
        </P>

        <P>
          Let <M>(<DefValue n="path_x1" r="x_1"/>, 0)</M> and <M>(<DefValue n="path_x2" r="x_2"/>, 0)</M> be in <R n="InnerVertices"/>, with <M post="."><R n="path_x1"/> \lt <R n="path_x2"/></M> The <Def n="shortest" r="shortest path"/> from <M>(<R n="path_x2"/>, 0)</M> to <M>(<R n="path_x1"/>, 0)</M> is the unique sequence <M>(v_0, \ldots, v_k)</M> such that<Ul>
            <Li><M post=",">v_0 = (<R n="path_x2"/>, 0)</M></Li>
            <Li><M post=",">v_k = (<R n="path_x1"/>, 0)</M> and</Li>
            <Li>
              for each <M post=",">0 \leq i \lt k</M> we have that<Ul>
                <Li>if the x-coordinate of the <R n="jump"/> of <M post="">v_i</M> is strictly less than <R n="path_x1"/>, then <M>v_<Curly>i + 1</Curly></M> is the <R n="predecessor"/> of <M post=",">v_i</M> else</Li>
                <Li><M>v_<Curly>i + 1</Curly></M> is the <R n="jump"/> of <M post=".">v_i</M></Li>
              </Ul>
            </Li>
          </Ul>
        </P>
      </PreviewScope>

      <Fig
        n="fig_large_path"
        title="An Example Path"
        caption={<>
          <P style="text-align: center;">
            The <R n="shortest"/> from <M>(20, 0)</M> to <M>(6, 0)</M> is the sequence <M post=".">((20, 0), (19, 0), (18, 2), (9, 2), (9, 1), (6, 1), (6, 0))</M>
          </P>
        </>}
        wrapperTagProps={{clazz: "veryWide"}}
      >
        <Img
          src={<ResolveAsset asset={["graphics", "large_path.svg"]} />}
        />
      </Fig>

      <PreviewScope>
        <P>
          The closed out-neighborhood of a <R n="shortest"/> between two <Rs n="commitment"/> serves as a certificate that one event happened before the other. Formally:
        </P>

        <P>
          <Alj>TODO FIXME misses some more jump vertices</Alj>
          Let <M>(<DefValue n="cert_x1" r="x_1"/>, 0)</M> and <M>(<DefValue n="cert_x2" r="x_2"/>, 0)</M> be in <R n="InnerVertices"/>, with <M post="."><R n="cert_x1"/> \lt <R n="cert_x2"/></M> The <Def n="certificate" r="prefix certificate"/> of <M>(<R n="cert_x1"/>, 0)</M> and <M>(<R n="cert_x2"/>, 0)</M> is the sequence that<Ul>
            <Li>
              starts with the <R n="label"/> of the <R n="jump"/> of (<R n="cert_x1"/>, 0) — or the <R n="hash"/> of the empty string, if <M post=","><R n="cert_x1"/> = 1</M> and which then
            </Li>
            <Li>
              continues with the <R n="label">labels</R> of the <Rs n="predecessor"/> of the elements of the <R n="shortest"/> from <M>(<R n="cert_x2"/>, 0)</M> to <M post="">(<R n="cert_x1"/>, 0)</M> in reverse order.
            </Li>
          </Ul>
        </P>
      </PreviewScope>

      <P>
        Continuing<Marginale>Note how the same <R n="digest"/> may appear multiple times in a <R n="certificate"/>. We could easily define a compressed version of prefix certificates that eliminates all but the first occurence of duplicate hashes, but verifying these becomes more difficult. Duplicates are rare enough (they only occur when the <M>y</M> coordinate of a <R n="jump"/> decreases strictly, which only happens toward the <Quotes>top-left of the graph</Quotes>) that we opted for the simpler verification procedure over the slight, best-case certificate size reductions.</Marginale> the example from <Rc n="fig_large_path"/>:<Br/>The <R n="certificate"/> of <M>(6, 0)</M> and <M>(20, 0)</M> is the sequence of the <Rs n="digest"/> of <M post=".">((5, 0), 6, (3, 1), (9, 0), (3, 1), (18, 1), 19, 20)</M>
      </P>

      <PreviewScope>
        <P>
          Given a sequence <M><DefValue n="claimed" r="cert"/> = (d_0, d_1, \ldots, l_k)</M> of <Rs n="digest"/> and a claim that <R n="claimed"/> is the <R n="certificate"/> of two <Rs n="commitment"/> <M>(<DefValue n="claim_x1" r="x_1"/>, 0)</M> with <R n="label"/> <M><DefValue n="label_1"/></M> and <M>(<DefValue n="claim_x2" r="x_2"/>, 0)</M> with <R n="label"/> <M post=","><DefValue n="label_2"/></M> you can iteratively verify that claim. To verify, use the information in <R n="claimed"/> to compute the labels of the <R n="shortest"/> path — successively and in reverse order. If the labels that you compute this way for <M>(<R n="claim_x1"/>, 0)</M> and <M>(<R n="claim_x2"/>, 0)</M> match <R n="label_1"/> and <R n="label_2"/> respectively, then you have successfully verified the <R n="certificate"/>. Assuming abscence of hash collisions, this proves that the sequence of all events up to <R n="event"/> <R n="claim_x1"/> is a prefix of the sequence of all events up to <R n="event"/> <R n="claim_x2"/>. Hence, in particular, <R n="event"/> <R n="claim_x1"/> happened before <R n="event"/> <R n="claim_x2"/>.
        </P>
      </PreviewScope>

      <P>
        And that is how someone else can efficiently prove to you that some event happened before another. For the use-case of transparency logs, a logging authority would sign <Rs n="commitment"/>. Signed <Rs n="commitment"/> take on the role of <A href="https://www.rfc-editor.org/rfc/rfc9162.html#name-signed-tree-head-sth">signed tree heads</A> in that scenario.
      </P>

      <P>
        For proofs of correctness and a detailed complexity analysis of the linking scheme that <R n="name"/> employs, see the <Bib item="meyer2023better">paper</Bib>.
      </P>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

/*
what, why (link), sync/nb/nb_send, basics: producer-buffered-bulk, consumer-buffered-bulk, piping, wrappers, feature flags, queues, converters
*/