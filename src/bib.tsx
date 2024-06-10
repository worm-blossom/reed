import { A, BibItemDeclaration, Em, I, M, P, Sup } from "../deps.ts";
import { BigOmega, Mathcal, MFrac } from "./macros.tsx";
import { BigO, BigTheta, Curly } from "./macros.tsx";

export const bib: BibItemDeclaration[] = [
  {
    item: `@article{meyer2023better,
  title={Better Prefix Authentication},
  author={Meyer, Aljoscha},
  journal={arXiv preprint arXiv:2308.15058},
  year={2023}
}
`,
    asset: ["references", "meyer2023better.pdf"],
    blurb: (
      <>
        <P>
          We present new schemes for solving prefix authentication
          and secure relative timestamping. By casting a new light on
          antimonotone linking schemes, we improve upon the state
          of the art in prefix authentication, and in timestamping with
          rounds of bounded length. Our designs can serve as more
          efficient alternatives to certificate transparency logs.
        </P>
      </>
    ),
  },
  {
    item: `@article{meyer2023sok,
  title={SoK: Authenticated Prefix Relations--A Unified Perspective On Relative Time-Stamping and Append-Only Logs},
  author={Meyer, Aljoscha},
  journal={arXiv preprint arXiv:2308.13836},
  year={2023}
}
`,
    asset: ["references", "meyer2023sok.pdf"],
    blurb: (
      <>
        <P>
          Secure relative timestamping and secure append-only logs are
          two historically mostly independent lines of research, which
          we show to be sides of the same coin — the authentication of
          prefix relations. From this more general viewpoint, we derive
          several complexity criteria not yet considered in previous
          literature. We define transitive prefix authentication graphs,
          a graph class that captures all hash-based timestamping and
          log designs we know of. We survey existing schemes by
          expressing them as transitive prefix authentication graphs,
          which yields more compact definitions and more complete
          evaluations than in the existing literature.
        </P>
      </>
    ),
  },
  {
    item: `@misc{laurie2021rfc,
  title={RFC 9162: Certificate Transparency Version 2.0},
  author={Laurie, B and Messeri, E and Stradling, R},
  year={2021},
  publisher={RFC Editor}
}
`,
    href: "https://www.rfc-editor.org/info/rfc9162",
    blurb: (
      <>
        <P>
          This document describes version 2.0 of the Certificate Transparency (CT) protocol for publicly logging the existence of Transport Layer Security (TLS) server certificates as they are issued or observed, in a manner that allows anyone to audit certification authority (CA) activity and notice the issuance of suspect certificates as well as to audit the certificate logs themselves. The intent is that eventually clients would refuse to honor certificates that do not appear in a log, effectively forcing CAs to add all issued certificates to the logs.
        </P>

        <P>
          This document obsoletes RFC 6962. It also specifies a new TLS extension that is used to send various CT log artifacts.
        </P>

        <P>
          Logs are network services that implement the protocol operations for submissions and queries that are defined in this document.
        </P>
      </>
    ),
  },
];
