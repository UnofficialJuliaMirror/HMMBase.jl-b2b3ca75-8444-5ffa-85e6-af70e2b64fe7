var documenterSearchIndex = {"docs":
[{"location":"utilities/#Utilities-1","page":"Utilities","title":"Utilities","text":"","category":"section"},{"location":"utilities/#","page":"Utilities","title":"Utilities","text":"gettransmat\nrandtransmat","category":"page"},{"location":"utilities/#HMMBase.gettransmat","page":"Utilities","title":"HMMBase.gettransmat","text":"gettransmat(seq; relabel = false) -> (Dict, Matrix)\n\nReturn the transition matrix associated to the label sequence seq.   The labels must be positive integer.  \n\nArguments\n\nrelabel::Bool (false by default): if set to true the sequence will be made contiguous. E.g. [7,7,9,9,1,1] will become [2,2,3,3,1,1].\n\nOutput\n\nDict{Integer,Integer}: the mapping between the original and the new labels.\nMatrix{Float64}: the transition matrix.\n\n\n\n\n\n","category":"function"},{"location":"utilities/#HMMBase.randtransmat","page":"Utilities","title":"HMMBase.randtransmat","text":"randtransmat(prior) -> Matrix{Float64}\n\nGenerate a transition matrix where each row is sampled from prior.   The prior must be a multivariate probability distribution, such as a Dirichlet distribution.\n\nExample\n\nA = randtransmat(Dirichlet([0.1, 0.1, 0.1]))\n\n\n\n\n\nrandtransmat(K, α = 1.0) -> Matrix{Float64}\n\nGenerate a transition matrix where each row is sampled from a Dirichlet distribution of dimension K and concentration parameter α.\n\nExample\n\nA = randtransmat(4)\n\n\n\n\n\n","category":"function"},{"location":"_index/#Index-1","page":"Index","title":"Index","text":"","category":"section"},{"location":"_index/#","page":"Index","title":"Index","text":"","category":"page"},{"location":"examples/mle/#","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"EditURL = \"https://github.com/maxmouchet/HMMBase.jl/blob/master/examples/mle.jl\"","category":"page"},{"location":"examples/mle/#Maximum-Likelihood-Estimation-1","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"","category":"section"},{"location":"examples/mle/#","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"using Distributions\nusing HMMBase\nusing Plots\n\ny1 = rand(Normal(0,2), 1000)\ny2 = rand(Normal(10,1), 500)\ny = vcat(y1, y2, y1, y2)\n\nplot(y, linetype=:steppre, size=(600,200))","category":"page"},{"location":"examples/mle/#","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"For now HMMBase does not handle the initialization of the parameters. Hence we must instantiate an initial HMM by hand.","category":"page"},{"location":"examples/mle/#","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"hmm = HMM([0.5 0.5; 0.5 0.5], [Normal(-1,2), Normal(15,2)])\nhmm = fit_mle(hmm, y, display = :iter)","category":"page"},{"location":"examples/mle/#","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"z_viterbi = viterbi(hmm, y)\nplot(z_viterbi, linetype=:steppre, label=\"Viterbi decoded hidden state\", size=(600,200))","category":"page"},{"location":"examples/mle/#","page":"Maximum Likelihood Estimation","title":"Maximum Likelihood Estimation","text":"This page was generated using Literate.jl.","category":"page"},{"location":"models/#Models-1","page":"Models","title":"Models","text":"","category":"section"},{"location":"models/#","page":"Models","title":"Models","text":"HMM\nrand\npermute\nistransmat\nnparams\ncopy\nsize","category":"page"},{"location":"models/#HMMBase.HMM","page":"Models","title":"HMMBase.HMM","text":"HMM([a, ]A, B) -> HMM\n\nBuild an HMM with transition matrix A and observations distributions B.   If the initial state distribution a is not specified, a uniform distribution is assumed. \n\nObservations distributions can be of different types (for example Normal and Exponential).   However they must be of the same dimension (all scalars or all multivariates).\n\nArguments\n\na::AbstractVector{T}: initial probabilities vector.\nA::AbstractMatrix{T}: transition matrix.\nB::AbstractVector{<:Distribution{F}}: observations distributions.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\n\n\n\n\n\n","category":"type"},{"location":"models/#Base.rand","page":"Models","title":"Base.rand","text":"rand(hmm, T; ...) -> Matrix | (Vector, Matrix)\n\nGenerate a random trajectory of hmm for T timesteps.\n\nArguments\n\ninit::Integer (rand(Categorical(hmm.a)) by default): initial state.\nseq::Bool (false by default): whether to return the hidden state sequence.\n\nOutput\n\nVector{Int}: hidden state sequence.\nMatrix{Float64} (if seq is true): observations (T x dim(obs)).\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\ny = rand(hmm, 1000)\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nz, y = rand(hmm, 1000, seq = true)\n\n\n\n\n\nrand(hmm::AbstractHMM, z::AbstractVector{Int}) -> Matrix\n\nGenerate observations from hmm according to trajectory z.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\ny = rand(hmm, [1, 1, 2, 2, 1])\n\n\n\n\n\n","category":"function"},{"location":"models/#HMMBase.permute","page":"Models","title":"HMMBase.permute","text":"permute(hmm) -> HMM\n\nPermute the states of hmm according to perm.\n\nExample\n\nhmm = HMM([0.8 0.2; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nhmm = permute(hmm, [2, 1])\nhmm.A # [0.9 0.1; 0.2 0.8]\nhmm.B # [Normal(10,1), Normal(0,1)]\n\n\n\n\n\n","category":"function"},{"location":"models/#HMMBase.istransmat","page":"Models","title":"HMMBase.istransmat","text":"istransmat(A) -> Bool\n\nReturn true if A is square and its rows sums to 1.\n\n\n\n\n\n","category":"function"},{"location":"models/#HMMBase.nparams","page":"Models","title":"HMMBase.nparams","text":"nparams(hmm) -> Int\n\nReturn the number of free parameters in hmm.\n\nwarning: Warning\nDoes not work, currently, for observations distributions with non-scalar parameters.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nnparams(hmm) # 6\n\n\n\n\n\n","category":"function"},{"location":"models/#Base.copy","page":"Models","title":"Base.copy","text":"copy(hmm) -> HMM\n\nReturns a copy of hmm.\n\n\n\n\n\n","category":"function"},{"location":"models/#Base.size","page":"Models","title":"Base.size","text":"size(hmm, [dim]) -> Int | Tuple\n\nReturns the number of states in the HMM and the dimension of the observations.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nsize(hmm) # (2,1)\n\n\n\n\n\n","category":"function"},{"location":"models/#Likelihoods-1","page":"Models","title":"Likelihoods","text":"","category":"section"},{"location":"models/#","page":"Models","title":"Models","text":"likelihoods\nloglikelihood","category":"page"},{"location":"models/#HMMBase.likelihoods","page":"Models","title":"HMMBase.likelihoods","text":"likelihoods(hmm, observations) -> Matrix\n\nReturn the likelihood per-state and per-observation.\n\nArguments\n\nlogl::Bool: see common options (TODO).\n\nOutput\n\nMatrix{Float64}: a TxK likelihoods matrix.\n\n\n\n\n\n","category":"function"},{"location":"models/#StatsBase.loglikelihood","page":"Models","title":"StatsBase.loglikelihood","text":"likelihood(hmm, observations; ...)\n\nCompute the likelihood of the observations under the model.   This is defined as the sum of the log of the normalization coefficients in the forward filter.\n\nArguments\n\nlogl, robust: see common options.\n\n\n\n\n\n","category":"function"},{"location":"models/#Stationnary-Distributions-1","page":"Models","title":"Stationnary Distributions","text":"","category":"section"},{"location":"models/#","page":"Models","title":"Models","text":"statdists","category":"page"},{"location":"models/#HMMBase.statdists","page":"Models","title":"HMMBase.statdists","text":"statdists(hmm)\n\nReturn the stationnary distribution(s) of hmm.   That is, the eigenvectors of transpose(hmm.A) with eigenvalues 1.\n\n\n\n\n\n","category":"function"},{"location":"models/#Custom-Types-1","page":"Models","title":"Custom Types","text":"","category":"section"},{"location":"models/#","page":"Models","title":"Models","text":"AbstractHMM","category":"page"},{"location":"models/#HMMBase.AbstractHMM","page":"Models","title":"HMMBase.AbstractHMM","text":"AbstractHMM{F<:VariateForm}\n\nA custom HMM type must at-least implement the following interface:\n\nstruct CustomHMM{F,T} <: AbstractHMM{F}\n    a::AbstractVector{T}               # Initial state distribution\n    A::AbstractMatrix{T}               # Transition matrix\n    B::AbstractVector{Distribution{F}} # Observations distributions\n    # Custom fields ....\nend\n\n\n\n\n\n","category":"type"},{"location":"migration/#Migrating-to-v1.0-1","page":"Migrating to v1.0","title":"Migrating to v1.0","text":"","category":"section"},{"location":"migration/#","page":"Migrating to v1.0","title":"Migrating to v1.0","text":"HMMBase v1.0 introduces the following breaking changes:","category":"page"},{"location":"migration/#","page":"Migrating to v1.0","title":"Migrating to v1.0","text":"HMM struct renaming: π0, π, D become a, A, B\nMethods renaming, see below for a full list\nForward/Backward algorithms uses likelihood by default (instead of log-likelihoods), use the logl option to use log-likelihoods\nBaum-Welch algorithm returns hmm, history instead of hmm, logtot\nrand(hmm, T) returns y instead of z, y by default, use seq = true to get z, y","category":"page"},{"location":"migration/#Deprecated/renamed-methods-1","page":"Migrating to v1.0","title":"Deprecated/renamed methods","text":"","category":"section"},{"location":"migration/#","page":"Migrating to v1.0","title":"Migrating to v1.0","text":"# @deprecate old new\n\n@deprecate n_parameters(hmm) nparams(hmm)\n@deprecate log_likelihoods(hmm, observations) likelihoods(hmm, observations, logl = true)\n\n@deprecate forward_backward(init_distn, trans_matrix, log_likelihoods) posteriors(init_distn, trans_matrix, log_likelihoods, logl = true)\n@deprecate messages_forwards(init_distn, trans_matrix, log_likelihoods) forward(init_distn, trans_matrix, log_likelihoods, logl = true)\n@deprecate messages_backwards(init_distn, trans_matrix, log_likelihoods) backward(init_distn, trans_matrix, log_likelihoods, logl = true)\n\n@deprecate forward_backward(hmm, observations) posteriors(hmm, observations, logl = true)\n@deprecate messages_forwards(hmm, observations) forward(hmm, observations, logl = true)\n@deprecate messages_backwards(hmm, observations) backward(hmm, observations, logl = true)\n\n@deprecate messages_forwards_log(init_distn, trans_matrix, log_likelihoods) log.(forward(init_distn, trans_matrix, log_likelihoods, logl = true)[1])\n@deprecate messages_backwards_log(trans_matrix, log_likelihoods) log.(backward(init_distn, trans_matrix, log_likelihoods, logl = true)[1])\n\n@deprecate compute_transition_matrix(seq) gettransmat(seq, relabel = true)\n@deprecate rand_transition_matrix(K, α = 1.0) randtransmat(K, α)","category":"page"},{"location":"internals/#Internals-1","page":"Internals","title":"Internals","text":"","category":"section"},{"location":"internals/#In-place-versions-1","page":"Internals","title":"In-place versions","text":"","category":"section"},{"location":"internals/#","page":"Internals","title":"Internals","text":"Not exported, used internally. Generated with macros.","category":"page"},{"location":"internals/#","page":"Internals","title":"Internals","text":"Copies performed at the boundaries.","category":"page"},{"location":"internals/#","page":"Internals","title":"Internals","text":"Table with in-place / generated correspondence.","category":"page"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"EditURL = \"https://github.com/maxmouchet/HMMBase.jl/blob/master/examples/continuous_obs.jl\"","category":"page"},{"location":"examples/continuous_obs/#HMM-with-continuous-observations-1","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"","category":"section"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"using Distributions\nusing HMMBase\nusing Plots\n\na = [0.6, 0.4]\nA = [0.7 0.3; 0.4 0.6]\nB = [MvNormal([0.0,5.0],[1.0,1.0]), MvNormal([5.0,10.0],[1.0,1.0])]\nhmm = HMM(a, A, B)","category":"page"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"z, y = rand(hmm, 250)\nz_viterbi = viterbi(hmm, y);","category":"page"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"plot(y, linetype=:steppre, label=[\"Observations (1)\", \"Observations (2)\"], size=(600,200))","category":"page"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"plot(z, linetype=:steppre, label=\"True hidden state\", size=(600,200))","category":"page"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"plot(z_viterbi, linetype=:steppre, label=\"Viterbi decoded hidden state\", size=(600,200))","category":"page"},{"location":"examples/continuous_obs/#","page":"HMM with continuous observations","title":"HMM with continuous observations","text":"This page was generated using Literate.jl.","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"EditURL = \"https://github.com/maxmouchet/HMMBase.jl/blob/master/examples/discrete_obs.jl\"","category":"page"},{"location":"examples/discrete_obs/#HMM-with-discrete-observations-1","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"","category":"section"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"using Distributions\nusing HMMBase\nusing Plots","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"https://en.wikipedia.org/wiki/Viterbi_algorithm#Example","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"a = [0.6, 0.4]\nA = [0.7 0.3; 0.4 0.6]\nB = [Categorical([0.5, 0.4, 0.1]), Categorical([0.1, 0.3, 0.6])]\nhmm = HMM(a, A, B)","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"z, y = rand(hmm, 250)\nz_viterbi = viterbi(hmm, y);","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"plot(y, linetype=:steppre, label=\"Observations\", size=(600,200))","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"plot(z, linetype=:steppre, label=\"True hidden state\", size=(600,200))","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"plot(z_viterbi, linetype=:steppre, label=\"Viterbi decoded hidden state\", size=(600,200))","category":"page"},{"location":"examples/discrete_obs/#","page":"HMM with discrete observations","title":"HMM with discrete observations","text":"This page was generated using Literate.jl.","category":"page"},{"location":"algorithms/#Algorithms-1","page":"Algorithms","title":"Algorithms","text":"","category":"section"},{"location":"algorithms/#common_options-1","page":"Algorithms","title":"Common Options","text":"","category":"section"},{"location":"algorithms/#","page":"Algorithms","title":"Algorithms","text":"logl::Bool (false by default): whether to use samples likelihoods, or log-likelihoods.\nrobust::Bool (false by default): truncates [-Inf, +Inf] to [eps(), prevfloat(Inf)] or [eps(), log(prevfloat(Inf))] in the log. case.","category":"page"},{"location":"algorithms/#Forward-Backward-1","page":"Algorithms","title":"Forward-Backward","text":"","category":"section"},{"location":"algorithms/#","page":"Algorithms","title":"Algorithms","text":"forward\nbackward\nposteriors","category":"page"},{"location":"algorithms/#HMMBase.forward","page":"Algorithms","title":"HMMBase.forward","text":"forward(a, A, L; ...) -> (Vector, Float)\n\nCompute forward probabilities using samples likelihoods. See Forward-backward algorithm.\n\nArguments\n\na::AbstractVector: initial probabilities vector.\nA::AbstractMatrix: transition matrix.\nL::AbstractMatrix: (log-)likelihoods.\nlogl: see common options.\n\nOutput\n\nVector{Float64}: forward probabilities.\nFloat64: log-likelihood of the observed sequence.\n\n\n\n\n\nforward(hmm, observations; ...) -> (Vector, Float)\n\nCompute forward probabilities of the observations given the hmm model.\n\nArguments\n\nlogl: see common options.\n\nOutput\n\nVector{Float64}: forward probabilities.\nFloat64: log-likelihood of the observed sequence.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nz, y = rand(hmm, 1000)\nprobs, tot = forward(hmm, y)\n\n\n\n\n\n","category":"function"},{"location":"algorithms/#HMMBase.backward","page":"Algorithms","title":"HMMBase.backward","text":"backward(a, A, L; ...) -> (Vector, Float)\n\nCompute backward probabilities using samples likelihoods. See Forward-backward algorithm.\n\nArguments\n\na::AbstractVector: initial probabilities vector.\nA::AbstractMatrix: transition matrix.\nL::AbstractMatrix: (log-)likelihoods.\nlogl: see common options.\n\nOutput\n\nVector{Float64}: backward probabilities.\nFloat64: log-likelihood of the observed sequence.\n\n\n\n\n\nbackward(hmm, observations; ...) -> (Vector, Float)\n\nCompute backward probabilities of the observations given the hmm model.\n\nArguments\n\nlogl: see common options.\n\nOutput\n\nVector{Float64}: backward probabilities.\nFloat64: log-likelihood of the observed sequence.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nz, y = rand(hmm, 1000)\nprobs, tot = backward(hmm, y)\n\n\n\n\n\n","category":"function"},{"location":"algorithms/#HMMBase.posteriors","page":"Algorithms","title":"HMMBase.posteriors","text":"posteriors(α, β)\n\nCompute posterior probabilities from α and β.\n\n\n\n\n\nposteriors(a, A, L)\n\nCompute posterior probabilities using samples likelihoods.\n\n\n\n\n\nposteriors(hmm, observations)\n\nCompute posterior probabilities using samples likelihoods.\n\nExample\n\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Normal(10,1)])\nz, y = rand(hmm, 1000)\nγ = posteriors(hmm, y)\n\n\n\n\n\n","category":"function"},{"location":"algorithms/#Baum–Welch-1","page":"Algorithms","title":"Baum–Welch","text":"","category":"section"},{"location":"algorithms/#","page":"Algorithms","title":"Algorithms","text":"fit_mle","category":"page"},{"location":"algorithms/#Distributions.fit_mle","page":"Algorithms","title":"Distributions.fit_mle","text":"fit_mle(hmm, observations; kwargs...) -> AbstractHMM\n\nEstimate the HMM parameters using the EM (Baum-Welch) algorithm.\n\nArguments\n\ndisplay::Symbol (:none by default): when to display convergence logs, can be set to :iter or :final.\ninit::Symbol (:none by default): if set to :kmeans the HMM parameters will be initialized using a K-means clustering.\nmaxiter::Integer (100 by default): maximum number of iterations to perform.\ntol::Integer (1e-3 by default): stop the algorithm when the improvement in the log-likelihood is less than tol.\n\nOutput\n\n<:AbstractHMM: a copy of the original HMM with the updated parameters.\n\n\n\n\n\n","category":"function"},{"location":"algorithms/#Viterbi-1","page":"Algorithms","title":"Viterbi","text":"","category":"section"},{"location":"algorithms/#","page":"Algorithms","title":"Algorithms","text":"viterbi","category":"page"},{"location":"algorithms/#HMMBase.viterbi","page":"Algorithms","title":"HMMBase.viterbi","text":"viterbi(a::AbstractVector, A::AbstractMatrix, L::AbstractMatrix) -> Vector\n\nFind the most likely hidden state sequence, see Viterbi algorithm.\n\n\n\n\n\nviterbi(hmm, observations) -> Vector\n\n\n\n\n\n","category":"function"},{"location":"notations/#Notations-1","page":"Notations","title":"Notations","text":"","category":"section"},{"location":"notations/#","page":"Notations","title":"Notations","text":"Symbol Shape Description\nK - Number of states in an HMM\nT - Number of observations\na K Initial state distribution\nA KxK Transition matrix\nB K Vector of observations distributions\nα TxK Forward filter\nβ TxK Backward filter\nγ TxK Posteriors (α * β)","category":"page"},{"location":"notations/#","page":"Notations","title":"Notations","text":"Before version 1.0:","category":"page"},{"location":"notations/#","page":"Notations","title":"Notations","text":"Symbol Shape Description\nπ0 K Initial state distribution\nπ KxK Transition matrix\nD K Vector of observation distributions","category":"page"},{"location":"#Home-1","page":"Home","title":"Home","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(View project on GitHub)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"HMMBase provides a lightweight and efficient abstraction for hidden Markov models in Julia. Most HMMs libraries only support discrete (e.g. categorical) or normal distributions. In contrast HMMBase builds upon Distributions.jl to support arbitrary univariate and multivariate distributions.  ","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The goal is to provide well-tested and fast implementations of the basic HMMs algorithms such as the forward-backward algorithm, the Viterbi algorithm, and the MLE estimator. More advanced models, such as Bayesian HMMs, can be built upon HMMBase.","category":"page"},{"location":"#Getting-Started-1","page":"Home","title":"Getting Started","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The package can be installed with the Julia package manager. From the Julia REPL, type ] to enter the Pkg REPL mode and run:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"pkg> add HMMBase","category":"page"},{"location":"#","page":"Home","title":"Home","text":"HMMBase supports any observations distributions implementing the Distribution interface from Distributions.jl.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using Distributions, HMMBase\n\n# Univariate continuous observations\nhmm = HMM([0.9 0.1; 0.1 0.9], [Normal(0,1), Gamma(1,1)])\n\n# Multivariate continuous observations\nhmm = HMM([0.9 0.1; 0.1 0.9], [MvNormal([0.,0.],[1.,1.]), MvNormal([0.,0.],[1.,1.])])\n\n# Univariate discrete observations\nhmm = HMM([0.9 0.1; 0.1 0.9], [Categorical([0.3, 0.7]), Categorical([0.8, 0.2])])\n\n# Multivariate discrete observations\nhmm = HMM([0.9 0.1; 0.1 0.9], [Multinomial(10, [0.3, 0.7]), Multinomial(10, [0.8, 0.2])])","category":"page"},{"location":"#","page":"Home","title":"Home","text":"See the Manual section for more details on the models and algorithms, or jump directly to the Examples.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Logo: lego by jon trillana from the Noun Project.","category":"page"}]
}
