__precompile__()

"""
Hidden Markov Models for Julia.
"""
module HMMBase

using ArgCheck
using Distributions

import Base: rand, size
import LinearAlgebra: mul!, transpose
import StatsFuns: logsumexp

export
    # hmm.jl
    AbstractHMM,
    HMM,
    assert_hmm,
    rand,
    istransmat,
    n_parameters,
    likelihoods,
    loglikelihoods,
    # messages*.jl
    forward,
    forward_log,
    forward_loglog,
    backward,
    backward_log,
    backward_loglog,
    posteriors_log,
    # mle.jl
    mle_step,
    fit_mle,
    fit_mle!,
    # viterbi.jl
    viterbi,
    # utils.jl,
    compute_transition_matrix

include("hmm.jl")
include("messages.jl")
include("messages_log.jl")
include("messages_loglog.jl")
include("mle.jl")
include("viterbi.jl")
include("utilities.jl")

# Deprecations

include("deprecated.jl")

export
    forward_backward,
    messages_backwards,
    messages_backwards_log,
    messages_forwards,
    messages_forwards_log,

@deprecate log_likelihoods(hmm, observations) loglikelihoods(hmm, observations)
@deprecate forward_backward(init_distn, trans_matrix, log_likelihoods) posteriors_log(init_distn, trans_matrix, log_likelihoods)
@deprecate messages_forwards(init_distn, trans_matrix, log_likelihoods) forward_log(init_distn, trans_matrix, log_likelihoods)
@deprecate messages_backwards(init_distn, trans_matrix, log_likelihoods) backward_log(init_distn, trans_matrix, log_likelihoods)
@deprecate forward_backward(hmm, observations) posteriors_log(hmm, observations)
@deprecate messages_forwards(hmm, observations) forward_log(hmm, observations)
@deprecate messages_backwards(hmm, observations) backward_log(hmm, observations)
@deprecate messages_forwards_log(init_distn, trans_matrix, log_likelihoods) forward_loglog(init_distn, trans_matrix, log_likelihoods)
@deprecate messages_backwards_log(trans_matrix, log_likelihoods) backward_loglog(trans_matrix, log_likelihoods)

end
